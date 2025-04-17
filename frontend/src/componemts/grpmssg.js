import { useState, useEffect, useContext , useRef  } from "react";
import "./Mssg.css";
import LivegrpContext from "../context/LivegrpConstext";

export default function Grpmssg() {
  const { messages, fetchdata, senddata } = useContext(LivegrpContext);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
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
        <h1 className="chat-title animate-title">We$Chat</h1>
        <div className="chat-box animate-chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "You" ? "sent" : "received"}`}
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

