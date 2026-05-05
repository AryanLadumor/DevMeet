import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user.userInfo);
  // console.log(user._id);
  const { _id, firstName, lastName , photoURL } = user;
  const userId = _id;

  useEffect(() => {

    if (!userId) {
      return;
    }

    //creating conection
    const socket = createSocketConnection();

    //as soon as page load join Caht event is emited
    socket.emit("joinChat", { fn: user.firstName, userId, targetUserId });

      socket.on("messageRecived",({firstName , lastName , photoURL ,  newMessage})=>{
      console.log(firstName , lastName , newMessage)
      setMessages((prev)=>[...prev , {firstName , lastName , photoURL, newMessage}])
    }) 

    //on unmouting the component close the connection very imp
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);



  const socket = createSocketConnection();

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      photoURL,
      targetUserId,
      newMessage,
    });

    setNewMessage("")
  };


  return (
    <div className="flex flex-col  items-center">
      <h1 className="p-5 text-2xl">Chat</h1>

      <div className="flex flex-col justify-end   p-2  w-3/7 h-100  border border-gray-500 rounded">
        {/* chat */}

        <div>
          {messages.map((msg, i) => {
            return (
              <div key={i} className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg.photoURL}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.firstName + " " + lastName}
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">{msg.newMessage }</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            );
          })}
        </div>

        <hr className="" />

        {/* input */}
        <div className="m-1 flex items-center ">
          <input
            type="text"
            placeholder="Type here"
            className="input w-4/5"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button
            className="btn w-1/5 btn-secondary m-3 p-2 text-lg"
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
