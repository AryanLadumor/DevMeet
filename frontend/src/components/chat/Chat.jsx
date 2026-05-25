import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import apiCall from "../../utils/axiosInstance";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const user = useSelector((store) => store.user.userInfo);
  const { _id, firstName, lastName, photoURL } = user || {};
  const userId = _id;

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Maintain a reference to targetUser so socket event listeners can access its freshest state
  const targetUserRef = useRef(null);
  useEffect(() => {
    targetUserRef.current = targetUser;
  }, [targetUser]);

  // Fetch chat history message entries on initial load
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chat = await apiCall.get(`chat/${targetUserId}`);

        // Safely extract and save your connection partner's full populated profile card
        if (chat.data.participants) {
          const partner = chat.data.participants.find((p) => p._id !== userId);
          console.log(chat.data.participants);
          setTargetUser(partner);
        }

        const chatMessages = chat.data.messages.map((msg) => {
          const { senderId, text, createdAt } = msg;
          const date = new Date(createdAt);
          const hours = String(date.getHour+s()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          // Standardize database structure handles gracefully whether populated or raw string
          const senderObj = typeof senderId === "object" ? senderId : {};
          const currentSenderId =
            typeof senderId === "object" ? senderId?._id : senderId;

          return {
            senderId: currentSenderId,
            firstName: senderObj.firstName,
            lastName: senderObj.lastName,
            photoURL: senderObj.photoURL,
            newMessage: text,
            createdAt: `${hours}:${minutes}`,
          };
        });

        setMessages(chatMessages);
      } catch (error) {
        console.error("Error retrieving conversation records:", error);
      }
    };

    if (userId) fetchChatMessages();
  }, [targetUserId, userId]);

  // Handle active socket connectivity actions
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socketRef.current.emit("joinChat", {
      fn: firstName,
      userId,
      targetUserId,
    });

    const handleMessageReceived = ({
      senderId,
      firstName,
      lastName,
      photoURL,
      newMessage,
      createdAt,
    }) => {
      const date = new Date(createdAt);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      console.log(firstName, lastName, newMessage);
      setMessages((prev) => [
        ...prev,
        {
          senderId,
          firstName,
          lastName,
          photoURL,
          newMessage,
          createdAt: formattedTime,
        },
      ]);
    };
    socket.on("messageRecived", handleMessageReceived);

    return () => {
      socket.off("messageRecived", handleMessageReceived);
      socket.disconnect();
    };
  }, [userId, targetUserId, firstName, lastName, photoURL]);

  // Smooth scroll pinning mechanism anchor links
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // ✅ Optimistically add to local state
    setMessages((prev) => [
      ...prev,
      {
        senderId: userId,
        firstName,
        lastName,
        photoURL,
        newMessage: newMessage.trim(),
        createdAt: `${hours}:${minutes}`,
      },
    ]);

    socketRef.current?.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      photoURL,
      targetUserId,
      newMessage: newMessage.trim(),
      createdAt: now,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 h-[calc(100vh-6rem)] flex flex-col justify-between">
      {/* Dynamic Conversation Header Bar context panel */}
      <div className="flex items-center gap-3 bg-base-200 border border-base-300 rounded-2xl p-3 shadow-md shrink-0">
        <Link
          to="/connections"
          className="btn btn-ghost btn-circle btn-sm md:flex hidden items-center justify-center"
        >
          ‹
        </Link>
        <div className="avatar">
          <div className="w-10 h-10 rounded-full bg-base-300 overflow-hidden">
            <img
              src={
                targetUser?.photoURL || "https://example.com/default-avatar.png"
              }
              alt="Partner avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-tight text-base-content">
            {targetUser
              ? `${targetUser.firstName} ${targetUser.lastName || ""}`
              : "Loading Contact..."}
          </h3>
          <span className="text-[10px] text-success font-bold uppercase tracking-wider block mt-0.5">
            Active Connection Channel
          </span>
        </div>
      </div>

      {/* Primary Message Bubble Stream Window */}
      <div className="flex-1 overflow-y-auto my-4 p-4 bg-base-200/40 border border-base-300/60 rounded-2xl shadow-inner space-y-4">
        {messages.map((msg, i) => {
          const isMe = String(msg.senderId) === String(userId);

          // Double safeguard data attributes configuration mapping
          const currentFirstName = isMe
            ? firstName
            : targetUser?.firstName || msg.firstName;
          const currentLastName = isMe
            ? lastName
            : targetUser?.lastName || msg.lastName;
          const currentPhotoURL = isMe
            ? photoURL
            : targetUser?.photoURL || msg.photoURL;

          return (
            <div
              key={i}
              className={`chat ${isMe ? "chat-end" : "chat-start"} animate-fadeIn`}
            >
              <div className="chat-image avatar">
                <div className="w-8 h-8 rounded-full bg-base-300 shadow-sm overflow-hidden">
                  <img
                    alt="User avatar"
                    src={
                      currentPhotoURL ||
                      "https://example.com/default-avatar.png"
                    }
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="chat-header text-xs text-base-content/40 font-semibold mb-0.5 px-1 flex items-baseline gap-1.5">
                <span>
                  {currentFirstName} {currentLastName || ""}
                </span>
                <time className="text-[10px] font-medium opacity-70">
                  {msg.createdAt}
                </time>
              </div>

              <div
                className={`chat-bubble text-sm font-medium max-w-xs sm:max-w-md leading-relaxed rounded-2xl shadow-sm ${
                  isMe
                    ? "chat-bubble-primary text-primary-content"
                    : "chat-bubble-neutral"
                }`}
              >
                {msg.newMessage}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Form Action Bar */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-2 shadow-lg shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Write a message..."
            className="input w-full h-11 bg-base-100/60 focus:bg-base-100 font-medium rounded-xl text-sm px-4 focus:border-secondary transition-all"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            className="btn btn-secondary h-11 px-5 rounded-xl font-bold tracking-wide shadow-md shadow-secondary/10 hover:shadow-secondary/20 transition-all duration-200"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
