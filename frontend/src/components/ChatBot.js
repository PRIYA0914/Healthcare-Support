/**
 * ChatBot Component - FAQ & Guidance Chatbot for Jarurat Care
 * 
 * PURPOSE:
 * This chatbot provides helpful guidance and answers common questions
 * for patients seeking support from the NGO. It is NOT a medical advisor.
 * 
 * FEATURES:
 * - Floating chat button (bottom-right)
 * - Expandable chat window
 * - Message list with user/bot distinction
 * - Input field with send button
 * - Auto-scroll to latest message
 * 
 * IMPORTANT DISCLAIMER:
 * This chatbot provides general guidance only. It does not provide
 * medical advice, diagnosis, or treatment.
 */

import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import '../styles/ChatBot.css';

/**
 * Initial welcome message from the bot
 * Sets expectations about what the chatbot can help with
 */
const WELCOME_MESSAGE = {
  type: 'bot',
  text: `Hello! 👋 I'm Jarurat Care's support assistant. I can help you with:

• Information about our services
• How to submit a support request
• Response time expectations
• General questions about our NGO

How can I help you today?

_Note: I provide general guidance only, not medical advice._`,
  timestamp: new Date()
};

/**
 * Quick reply suggestions for common questions
 * Helps users get started quickly
 */
const QUICK_REPLIES = [
  'What support do you provide?',
  'How long to get a response?',
  'Is my data safe?'
];

function ChatBot() {
  // Chat window visibility state
  const [isOpen, setIsOpen] = useState(false);
  
  // Messages array - starts with welcome message
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  
  // Current input value
  const [inputValue, setInputValue] = useState('');
  
  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(false);
  
  // Reference to messages container for auto-scroll
  const messagesEndRef = useRef(null);
  
  // Reference to input field for focus management
  const inputRef = useRef(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  /**
   * Focus input when chat opens
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  /**
   * Toggles the chat window open/closed
   */
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  /**
   * Handles input field changes
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * Sends a message to the chatbot API
   * 
   * @param {string} messageText - The message to send
   */
  const sendMessage = async (messageText) => {
    const text = messageText.trim();
    if (!text || isLoading) return;

    // Add user message to chat
    const userMessage = {
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to backend API
      const response = await sendChatMessage(text);
      
      // Add bot response
      const botMessage = {
        type: 'bot',
        text: response.reply || 'I apologize, but I couldn\'t process your message. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Error handling - show friendly error message
      const errorMessage = {
        type: 'bot',
        text: 'I apologize, but I\'m having trouble connecting right now. Please try again later or submit a support request through our form.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  /**
   * Handles quick reply button click
   */
  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  /**
   * Handles Enter key press (Shift+Enter for newline)
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /**
   * Formats message text for display
   * Handles line breaks and basic markdown-like formatting
   */
  const formatMessageText = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'chatbot-toggle--open' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className="chatbot-toggle__icon">✕</span>
        ) : (
          <>
            <span className="chatbot-toggle__icon">💬</span>
            <span className="chatbot-toggle__text">Need Help?</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window"
          role="dialog"
          aria-label="Chat with Jarurat Care support"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__info">
              <span className="chatbot-header__title">💚 Jarurat Care</span>
              <span className="chatbot-header__subtitle">Support Assistant</span>
            </div>
            <button
              className="chatbot-header__close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message chatbot-message--${message.type} ${message.isError ? 'chatbot-message--error' : ''}`}
              >
                {message.type === 'bot' && (
                  <div className="chatbot-message__avatar">🤖</div>
                )}
                <div className="chatbot-message__content">
                  <div className="chatbot-message__text">
                    {formatMessageText(message.text)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="chatbot-message chatbot-message--bot">
                <div className="chatbot-message__avatar">🤖</div>
                <div className="chatbot-message__content">
                  <div className="chatbot-message__typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies (shown only after welcome message) */}
          {messages.length === 1 && (
            <div className="chatbot-quick-replies">
              {QUICK_REPLIES.map((reply, index) => (
                <button
                  key={index}
                  className="chatbot-quick-reply"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={isLoading}
              maxLength={500}
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              {isLoading ? '...' : '→'}
            </button>
          </form>

          {/* Safety Disclaimer Footer */}
          <div className="chatbot-disclaimer">
            ⚕️ This chatbot provides guidance only, not medical advice.
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
