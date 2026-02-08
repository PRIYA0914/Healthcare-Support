import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState('');
  return (
    <form className="chatbot-input" onSubmit={e => { e.preventDefault(); if (value.trim()) { onSend(value); setValue(''); } }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type your question here…"
        aria-label="Chat input"
      />
      <button type="submit" disabled={!value.trim()}>Send</button>
    </form>
  );
}
