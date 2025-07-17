import React, { useState, useEffect, useRef } from 'react';
import '../styles/supportChat.css';

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (typing) {
      const cannedReplies = [
        "We'll get back to you shortly.",
        "You can view your booking history in the dashboard.",
        "Try reloading the page if something seems off.",
        "A technician will contact you soon.",
        "Your feedback is valuable to us!"
      ];

      const timer = setTimeout(() => {
        const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
        setMessages((prev) => [...prev, { sender: 'agent', text: reply }]);
        setTyping(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [typing]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setTyping(true);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="support-chat-wrapper">
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <strong>💬 FixAll Support</strong>
            <div className="agent-status">🟢 Online</div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'agent-msg'}>
                {msg.text}
              </div>
            ))}
            {typing && <div className="agent-msg">Agent is typing...</div>}
          </div>

          <textarea
            placeholder="Type a message..."
            rows="2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={sendMessage}>Send</button>
        </div>
      )}

      <button className="chat-toggle-btn" onClick={() => setOpen(!open)}>
        {open ? '❌' : '💬'}
      </button>
    </div>
  );
}

export default SupportChat;
