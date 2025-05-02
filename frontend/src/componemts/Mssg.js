import { useState, useEffect, useContext, useRef } from "react";
import "./Mssg.css";
import Livemssgcontext from "../context/LivemssgContext";

export default function Mssg() {
  const { messages, fetchdata, senddata, tok, friends } = useContext(Livemssgcontext);
  const storedFriend = JSON.parse(localStorage.getItem("fri"));
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetchdata();
    const fetchInterval = setInterval(() => {
      fetchdata().then(() => {
        setTimeout(() => {
          if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }
        }, 5000);
      });
    }, 5000);

    return () => clearInterval(fetchInterval);
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      senddata(input);
      setInput("");

      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="chat-container">
      {friends[tok] && (
        <div className="user-info d-flex align-items-center justify-content-center mb-3">
          <img
            src={storedFriend.image}
            alt="User"
            className="rounded-circle user-img"
          />
          <span className="ms-2 fw-medium text-dark">{storedFriend.name}</span>
        </div>
      )}

      <div className="chat-box animate-chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.name === localStorage.getItem("name") ? "sent" : "received"
            }`}
          >
            <span className="message-text">
        {msg.text}
            </span>
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
