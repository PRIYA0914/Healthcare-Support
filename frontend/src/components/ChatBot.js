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
 * - SMART SUGGESTIONS: Context-aware prompts that appear after responses
 * 
 * IMPORTANT DISCLAIMER:
 * This chatbot provides general guidance only. It does not provide
 * medical advice, diagnosis, or treatment.
 */

import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import QuickOptions from './QuickOptions';
import { getCategoryDetails } from '../utils/categoryConfig';
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
  timestamp: new Date(),
  intent: 'greeting'
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

/**
 * SMART SUGGESTIONS: Context-aware suggestions based on last response
 * 
 * These appear after bot responses to guide users to relevant follow-up questions.
 * This reduces typing and helps users discover features they might not know about.
 * 
 * Key UX benefits:
 * - Reduces cognitive load (users don't have to think of questions)
 * - Increases engagement by showing related topics
 * - Helps users find answers faster
 */
const SMART_SUGGESTIONS = {
  greeting: [
    'Tell me about your services',
    'How do I submit a request?',
    'What is response time?'
  ],
  services: [
    'Is this service free?',
    'How do I get started?',
    'Who are the volunteers?'
  ],
  response_time: [
    'What if I have an emergency?',
    'Can I check my request status?',
    'Is my data safe?'
  ],
  how_to_submit: [
    'What information do I need?',
    'What categories are available?',
    'How long until I hear back?'
  ],
  cost: [
    'What services do you provide?',
    'How can I support the NGO?',
    'Tell me about volunteering'
  ],
  emergency: [
    'What support do you provide?',
    'How quickly can you respond?',
    'Mental health resources'
  ],
  mental_health: [
    'Is this service confidential?',
    'What happens after I submit?',
    'Emergency resources'
  ],
  data_safety: [
    'How do I submit a request?',
    'Who will see my information?',
    'What services are available?'
  ],
  volunteer: [
    'What does volunteering involve?',
    'How many volunteers do you have?',
    'Other ways to help?'
  ],
  medical_service: [
    'What support do you offer?',
    'Where should I go for emergencies?',
    'Mental health support'
  ],
  default: [
    'What services do you provide?',
    'How long to get a response?',
    'How can I help?'
  ]
};


// CATEGORY-AWARE, LARGE SIDE PANEL CHATBOT
// Accepts submittedCategory prop for context-aware responses
function ChatBot({ submittedCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [typing, setTyping] = useState(false);

  // Rule-based safe response logic (can be expanded)
  function getBotResponse(userMsg) {
    const text = userMsg.toLowerCase();
    // Emergency keyword detection
    if (/emergency|urgent|critical|danger|help/.test(text)) {
      return {
        reply: 'This sounds like an emergency. Please contact your local emergency services immediately. Our support portal is not a substitute for emergency medical care.',
        intent: 'emergency',
      };
    }

    // Quick Option: What happens after submission?
    if (text.includes('what happens after submission')) {
      return {
        reply: 'After you submit your request, our team reviews the details and assigns a volunteer based on urgency and category. You will be contacted as soon as possible with next steps.',
        intent: 'process',
      };
    }
    // Quick Option: How long will it take to respond?
    if (text.includes('how long will it take to respond')) {
      return {
        reply: 'Response times depend on urgency and current case load. Emergency cases are prioritized (1-2 hours), while other requests may take up to 48 hours. We appreciate your patience!',
        intent: 'response_time',
      };
    }
    // Quick Option: Is this an emergency?
    if (text.includes('is this an emergency')) {
      return {
        reply: 'If you believe your situation is an emergency, please contact local emergency services immediately. Our portal is for general support and cannot replace urgent care.',
        intent: 'emergency',
      };
    }
    // Quick Option: Is my data safe?
    if (text.includes('is my data safe')) {
      return {
        reply: 'Your privacy is important to us. All information you provide is kept confidential and used only to connect you with appropriate support. We do not share your data outside the NGO.',
        intent: 'data_safety',
      };
    }
    // Quick Option: Support related to my category
    if (text.includes('support related to my category')) {
      if (submittedCategory) {
        const { label } = getCategoryDetails(submittedCategory);
        return {
          reply: `You selected the category: ${label}. Our volunteers are trained to provide guidance and resources specific to this area. If you have more details or questions, please share them!`,
          intent: 'category_support',
        };
      } else {
        return {
          reply: 'Please select a category in the support form to get more specific guidance.',
          intent: 'category_support',
        };
      }
    }
    // Category-specific quick options
    if (text.includes('what mental health support is available')) {
      return {
        reply: 'We offer emotional support, information on coping strategies, and can connect you with mental health professionals or helplines. All conversations are confidential.',
        intent: 'mental_health',
      };
    }
    if (text.includes('what should i do immediately')) {
      return {
        reply: 'If you are in immediate danger or experiencing a medical emergency, call your local emergency number now. Our team will also prioritize your request, but do not wait for a response.',
        intent: 'emergency',
      };
    }
    if (text.includes('what documents are required')) {
      return {
        reply: 'For financial or aid assistance, please prepare any relevant ID, proof of income, and medical documents. Our volunteers will let you know exactly what is needed after reviewing your case.',
        intent: 'financial',
      };
    }

    // Category-aware guidance (fallback)
    if (submittedCategory) {
      const { label } = getCategoryDetails(submittedCategory);
      if (submittedCategory === 'mental_health') {
        return {
          reply: `Since this is related to Mental Health, here are some general steps: \n• Reach out to trusted contacts or a counselor.\n• Practice self-care and seek a safe environment.\n• If you feel unsafe, contact a helpline or emergency services.`,
          intent: 'mental_health',
        };
      }
      if (submittedCategory === 'emergency') {
        return {
          reply: `This appears to be an emergency. Please call emergency services immediately. Our team will prioritize your request, but do not wait for a response if you are in danger.`,
          intent: 'emergency',
        };
      }
      if (submittedCategory === 'financial') {
        return {
          reply: `For Financial/Aid Assistance, please keep required documents ready. Our volunteers will guide you through the process.`,
          intent: 'financial',
        };
      }
      // Default category-aware
      return {
        reply: `Since this is related to ${label}, our team will review your request and provide general guidance soon.`,
        intent: 'default',
      };
    }
    // General fallback
    return {
      reply: 'I can provide general guidance about our NGO services, support process, and next steps. For medical emergencies, always contact professionals.',
      intent: 'default',
    };
  }

  // Quick options for initial and category-aware guidance
  const baseOptions = [
    'What happens after submission?',
    'How long will it take to respond?',
    'Is this an emergency?',
    'Is my data safe?',
    'Support related to my category'
  ];
  // Add category-specific options
  let categoryOptions = [];
  if (submittedCategory === 'mental_health') {
    categoryOptions.push('What mental health support is available?');
  } else if (submittedCategory === 'emergency') {
    categoryOptions.push('What should I do immediately?');
  } else if (submittedCategory === 'financial') {
    categoryOptions.push('What documents are required?');
  }
  const quickOptions = [...baseOptions, ...categoryOptions];

  // Handle sending a message (from input or quick option)
  const handleSend = (msg) => {
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: msg }]);
    setTyping(true);
    setTimeout(() => {
      const bot = getBotResponse(msg);
      setMessages(prev => [...prev, { type: 'bot', text: bot.reply }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {!isOpen && (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
          💬 Chat with Support
        </button>
      )}
      {isOpen && (
        <aside className="chatbot-panel">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages messages={messages} typing={typing} submittedCategory={submittedCategory} />
          {/* Show quick options at bottom, just above input, hide while typing */}
          {!typing && (
            <QuickOptions options={quickOptions} onOptionClick={handleSend} disabled={typing} />
          )}
          <ChatInput onSend={handleSend} />
          <div className="chatbot-disclaimer">
            This chatbot provides guidance only and does not replace medical professionals.
          </div>
        </aside>
      )}
    </>
  );
}

export default ChatBot;
