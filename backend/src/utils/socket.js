const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/Chat");
const ConnectionRequest = require("../models/ConnectionRequest");
const { SocketAddress } = require("net");

const getSecretRoomId = ({ userId, targetUserId }) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    //all event handler

    socket.on("joinChat", async ({ fn, userId, targetUserId }) => {
      //whenerve someone open this page we nned to create a room for every diff pair of person
      const roomId = getSecretRoomId({ userId, targetUserId });

      const areFriends = await ConnectionRequest.exists({
        status: "accepted",
        $or: [
          { fromUserId: userId, toUserId: targetUserId },
          { fromUserId: targetUserId, toUserId: userId },
        ],
      });
      if (!areFriends) return; // don't even let them join the room
      socket.areFriends = true;

      console.log(`${fn} join the room ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({
        firstName,
        lastName,
        userId,
        photoURL,
        targetUserId,
        newMessage,
        createdAt,
      }) => {
        try {
          const roomId = getSecretRoomId({ userId, targetUserId });
          console.log(`${firstName} ${lastName} send msg: ${newMessage}`);

          //Security can only send message if they are friend
          if (!socket.areFriends) return;

          //saving messages to data base
          let chat = await Chat.findOneAndUpdate(
            { participants: { $all: [userId, targetUserId] } },
            { $push: { messages: { senderId: userId, text: newMessage } } },
            { upsert: true, new: true },
          );


          socket.to(roomId).emit("messageRecived", {
            senderId : userId,
            firstName,
            lastName,
            photoURL,
            newMessage,
            createdAt: new Date(),
          });
        } catch (error) {
          console.log(error);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;

//TODO limit messages
//TODO implement auth in socket
