import React, { useState } from "react";
import "./FinancialChatbot.css";  // CSS file for styling the chatbot

const FinancialChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I’m your financial assistant. How can I help you today?", fromBot: true }
  ]);
  const [userInput, setUserInput] = useState("");

  // Function to handle user input and bot response
  const handleUserInput = (e) => {
    e.preventDefault();
    
    // Add user's message to the chat
    setMessages([
      ...messages,
      { text: userInput, fromBot: false },
      { text: "Thanks for your message! I will get back to you soon.", fromBot: true }
    ]);
    
    // Clear user input
    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Financial Assistant</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.fromBot ? "from-bot" : "from-user"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleUserInput} className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default FinancialChatbot;
