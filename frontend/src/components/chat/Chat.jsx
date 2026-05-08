import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import apiCall from "../../utils/axiosInstance";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user.userInfo);
  // console.log(user._id);
  const { _id, firstName, lastName, photoURL } = user;
  const userId = _id;

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchChatMessages = async () => {
      const chat = await apiCall.get(`chat/${targetUserId}`);

      console.log(chat.data.messages);

      const chatMessages = chat.data.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        const date = new Date(createdAt);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const formatted = `${hours}:${minutes}`;

        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          newMessage: text,
          photoURL: senderId?.photoURL,
          createdAt: formatted,
        };
      });

      setMessages(chatMessages);
    };

    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    //creating conection
    const socket = createSocketConnection();
    socketRef.current = socket;

    //as soon as page load join Caht event is emited
    socketRef.current.emit("joinChat", {
      fn: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on(
      "messageRecived",
      ({ firstName, lastName, photoURL, newMessage, createdAt }) => {
        console.log(firstName, lastName, newMessage, createdAt);
        const date = new Date(createdAt);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        const formatted = `${hours}:${minutes}`;
        setMessages((prev) => [
          ...prev,
          { firstName, lastName, photoURL, newMessage, createdAt: formatted },
        ]);
      },
    );
    //on unmouting the component close the connection very imp
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    socketRef.current?.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      photoURL,
      targetUserId,
      newMessage,
      createdAt: new Date(),
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="p-5 text-2xl">Chat</h1>

      <div className="flex flex-col w-3/7 h-[70vh] border border-gray-500 rounded overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-2">
          {messages.map((msg, i) => {
            return (
              <div
                key={i}
                className={`chat ${
                  msg.firstName === firstName ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="user" src={msg.photoURL} />
                  </div>
                </div>

                <div className="chat-header">
                  {msg.firstName + " " + msg.lastName}

                  <time className="text-xs opacity-50 ml-2">
                    {msg.createdAt}
                  </time>
                </div>

                <div className="chat-bubble">{msg.newMessage}</div>
              </div>
            );
          })}

          {/* Auto Scroll Target */}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-600 p-2 bg-base-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input flex-1"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button className="btn btn-secondary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
