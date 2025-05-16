import { useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
import "./Mssg.css";
import Livemssgcontext from "../context/LivemssgContext";

// Init socket once
const socket = io("https://mern-zeta-nine.vercel.app", {
  transports: ["websocket"],
  withCredentials: true,
});

export default function Mssg() {
  const { messages, fetchdata, senddata, clearMessages } = useContext(Livemssgcontext);
  const image = localStorage.getItem("friim");
  const nam = localStorage.getItem("frinam");
  const myName = localStorage.getItem("name");

  const [input, setInput] = useState("");
  const [liveMessages, setLiveMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // 1. Fetch messages from MongoDB once
    fetchdata().then(() => {
      scrollToBottom();
    });

    // 2. Join room for Socket.IO
    socket.emit("join-room", nam);

    // 3. Listen for new messages
    socket.on("receive-message", (msg) => {
      setLiveMessages((prev) => [...prev, msg]);
    });

    return () => {
      clearMessages();
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, liveMessages]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMsg = { name: myName, text: input };

      // Send to DB via context
      senddata(input);

      // Emit live to other user
      socket.emit("send-message", {
        from: myName,
        to: nam,
        text: input,
      });

      // Optimistic update
      setLiveMessages((prev) => [...prev, newMsg]);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="user-info d-flex align-items-center justify-content-center mb-3">
        <img src={image} alt="User" className="rounded-circle user-img" />
        <span className="ms-2 fw-medium text-dark">{nam}</span>
      </div>

      <div className="chat-box animate-chat-box" ref={chatBoxRef}>
        {[...messages, ...liveMessages].map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.name === myName ? "sent" : "received"
            }`}
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
