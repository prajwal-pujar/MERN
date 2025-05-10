import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Mssg.css";

const socket = io("http://localhost:5000");

export default function Mssg() {
  const myName = localStorage.getItem("name");
  const friendName = localStorage.getItem("frinam");
  const friendImg = localStorage.getItem("friim");

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const getRoomId = (a, b) => [a, b].sort().join("_");

  useEffect(() => {
    const room = getRoomId(myName, friendName);
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      if (data.sender === friendName && data.receiver === myName) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.emit("leave_room", room);
      socket.off("receive_message");
    };
  }, [myName, friendName]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMsg = {
        text: input,
        sender: myName,
        receiver: friendName,
        room: getRoomId(myName, friendName)
      };

      socket.emit("send_message", newMsg);
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="user-info d-flex align-items-center justify-content-center mb-3">
        <img src={friendImg} alt="User" className="rounded-circle user-img" />
        <span className="ms-2 fw-medium text-dark">{friendName}</span>
      </div>

      <div className="chat-box animate-chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === myName ? "sent" : "received"}`}
          >
            <span className="message-text">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
