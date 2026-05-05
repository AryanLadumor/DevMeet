const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket) => {
    //Handle events

    //hadller for "joinChat"
    socket.on("joinChat", ({fn, userId, targetUserId }) => {
      //whenerve someone open this page we nned to create a room for every diff pair of person
      const roomId = [userId,targetUserId].sort().join("_"); //sorting so that the room id will be same for the both user

        console.log(`${fn} join the room ${roomId}`)
        socket.join(roomId);
    });

    socket.on("sendMessage", ({firstName , lastName ,userId ,photoURL,targetUserId , newMessage}) => {
      const roomId = [userId,targetUserId].sort().join("_");
      console.log(`${firstName} ${lastName} send msg: ${newMessage}`)
        io.to(roomId).emit("messageRecived" , {firstName , lastName , photoURL, newMessage})
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
