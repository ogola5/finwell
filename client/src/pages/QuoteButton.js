import React, { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import "./QuoteButton.css";

const QuoteButton = () => {
  const quotes = [
    { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
    { text: "Do not save what is left after spending; spend what is left after saving.", author: "Warren Buffett" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Wealth is the ability to fully utilize one's capabilities.", author: "Nathaniel Branden" },
    { text: "The road to wealth is paved with delayed gratification.", author: "Warren Buffett" },
    { text: "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.", author: "Ayn Rand" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="quote-button">
      <FaPowerOff className="power-icon" />
      <div className="quote-content">
        <p>
          <em>"{quotes[currentQuoteIndex].text}"</em>
        </p>
        <p>
          <strong>- {quotes[currentQuoteIndex].author}</strong>
        </p>
      </div>
    </div>
  );
};

export default QuoteButton;
