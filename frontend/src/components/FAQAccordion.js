/**
 * FAQAccordion Component - Simulated Chatbot Knowledge Base
 * 
 * PURPOSE:
 * This component simulates a chatbot knowledge base for common questions.
 * Instead of implementing a complex real-time chat system, we provide
 * a lightweight FAQ section that addresses common user queries.
 * 
 * WHY FAQ INSTEAD OF CHATBOT:
 * - Real chatbots require complex infrastructure (NLP, state management, sessions)
 * - FAQs address 80% of common questions with minimal complexity
 * - Instant responses without API calls or loading states
 * - Easy to maintain and update content
 * - Demonstrates the concept without over-engineering
 * 
 * CHATBOT INTEGRATION NOTE:
 * In production, this could be enhanced with:
 * - Search functionality within FAQs
 * - AI-powered question matching
 * - Escalation to human support
 * - Integration with a chat service like Intercom or Freshchat
 */

import React, { useState } from 'react';
import '../styles/FAQAccordion.css';

/**
 * Predefined FAQs covering common user questions
 * In production, these could be fetched from a CMS or backend
 */
const FAQ_DATA = [
  {
    id: 1,
    question: 'What kind of support is provided by Jarurat Care?',
    answer: 'Jarurat Care provides healthcare support services including medical consultations, mental health resources, and emergency assistance coordination. Our volunteers connect patients with appropriate healthcare resources and follow up on their care needs.'
  },
  {
    id: 2,
    question: 'How long does it take to get a response?',
    answer: 'Response times depend on the urgency level of your request. High priority cases are addressed as soon as possible (typically within hours). Medium priority requests receive follow-up within 24-48 hours. Low priority inquiries are reviewed within 3-5 business days.'
  },
  {
    id: 3,
    question: 'Is my personal data safe?',
    answer: 'Yes, we take data privacy seriously. Your information is only used to process your support request and is handled by trained volunteers under strict confidentiality guidelines. We do not share personal health information with third parties without consent.'
  },
  {
    id: 4,
    question: 'Is this a medical service? Can you diagnose conditions?',
    answer: 'No, Jarurat Care is a support coordination service, not a medical provider. We cannot diagnose conditions or prescribe treatments. We help connect you with appropriate healthcare resources and provide support throughout your care journey. Always consult licensed healthcare professionals for medical advice.'
  }
];

function FAQAccordion() {
  // Track which FAQ items are currently expanded
  // Using an object allows multiple items to be open simultaneously
  const [expandedItems, setExpandedItems] = useState({});

  /**
   * Toggles the expanded state of an FAQ item
   * Allows multiple items to be open at once for better UX
   */
  const toggleItem = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="faq-accordion">
      <h3 className="faq-accordion__title">
        💬 Frequently Asked Questions
      </h3>
      <p className="faq-accordion__subtitle">
        {/* This simulates a chatbot knowledge base for common questions */}
        Find quick answers to common questions below
      </p>
      
      <div className="faq-accordion__list">
        {FAQ_DATA.map(faq => (
          <div 
            key={faq.id}
            className={`faq-accordion__item ${expandedItems[faq.id] ? 'faq-accordion__item--expanded' : ''}`}
          >
            <button
              className="faq-accordion__question"
              onClick={() => toggleItem(faq.id)}
              aria-expanded={expandedItems[faq.id] || false}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <span>{faq.question}</span>
              <span 
                className="faq-accordion__icon" 
                aria-hidden="true"
              >
                {expandedItems[faq.id] ? '−' : '+'}
              </span>
            </button>
            
            {expandedItems[faq.id] && (
              <div 
                id={`faq-answer-${faq.id}`}
                className="faq-accordion__answer"
                role="region"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQAccordion;
