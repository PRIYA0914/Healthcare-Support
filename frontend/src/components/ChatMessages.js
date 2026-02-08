import React, { useRef, useEffect } from 'react';

export default function ChatMessages({ messages, typing, submittedCategory }) {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  return (
    <div className="chatbot-messages">
      {messages.length === 0 && (
        <div className="chatbot-empty">Hi! I’m here to help with general guidance and FAQs.</div>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`chatbot-bubble ${msg.type}`}>
          {msg.text}
        </div>
      ))}
      {typing && <div className="chatbot-typing">Support bot is typing…</div>}
      <div ref={endRef} />
    </div>
  );
}
