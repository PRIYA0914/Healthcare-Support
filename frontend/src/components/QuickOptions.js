import React from 'react';

// QuickOptions: Renders selectable quick reply buttons for chatbot guidance.
// Improves usability by reducing typing and guiding users to safe, relevant questions.
export default function QuickOptions({ options, onOptionClick, disabled }) {
  return (
    <div className="chatbot-quick-options" aria-label="Quick options">
      {options.map((opt, i) => (
        <button
          key={i}
          className="chatbot-quick-option"
          onClick={() => onOptionClick(opt)}
          disabled={disabled}
          tabIndex={0}
          aria-label={opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
