import { useState, useEffect, useContext , useRef  } from "react";
import "./Mssg.css";
import Livemssgcontext from "../context/LivemssgContext";

export default function Mssg() {
  const { messages, fetchdata, senddata ,tok , friends} = useContext(Livemssgcontext);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetchdata()
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
    <div>
      <div className="chat-container">
          <li className="nav-item d-flex align-items-center ms-3">
   {friends[tok] && (
        <div className="user-info d-flex align-items-center justify-content-center mb-3">
          <img
            src={friends[tok].image}
            alt="User"
            className="rounded-circle user-img"
          />
          <span className="ms-2 fw-medium text-dark">{friends[tok].name}</span>
        </div>
      )}

{friends[tok] && (
  <>
    <img
      src={friends[tok].image}
      alt="User"
      className="rounded-circle"
      width="35"
      height="35"
      style={{ objectFit: 'cover' }}
    />
    <span className="ms-2 fw-medium text-dark">{friends[tok].name}</span>
  </>
)}
  </li>
        <div className="chat-box animate-chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.name === localStorage.getItem("name") ? "sent" : "received"}`}
            >
              
              <span className="message-text">{msg.name.charAt(0).toUpperCase() + msg.name.slice(1)} : : {msg.text}</span>
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
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}
