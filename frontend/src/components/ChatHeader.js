import React from 'react';

export default function ChatHeader({ onClose }) {
  return (
    <header className="chatbot-header">
      <div>
        <div className="chatbot-title">Healthcare Support Assistant</div>
        <div className="chatbot-subtitle">NGO Guidance & FAQs</div>
      </div>
      <button className="chatbot-close" onClick={onClose} aria-label="Close chat">✕</button>
    </header>
  );
}
