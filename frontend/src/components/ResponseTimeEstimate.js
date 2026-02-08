/**
 * ResponseTimeEstimate Component - Dynamic Wait Time Calculator
 * 
 * PURPOSE:
 * Calculates and displays an estimated response time based on
 * the urgency level of the request. Sets clear expectations for
 * patients about when they can expect to hear from a volunteer.
 * 
 * CALCULATION LOGIC:
 * - HIGH urgency: 1-2 hours (immediate priority)
 * - MEDIUM urgency: 24-48 hours (standard queue)
 * - LOW urgency: 2-5 days (routine handling)
 * 
 * Note: These are estimates. Actual times vary based on:
 * - Volunteer availability
 * - Current request volume
 * - Complexity of the issue
 * 
 * UX REASONING:
 * - Clock icon creates immediate visual recognition
 * - Color coding matches urgency badge for consistency
 * - Smaller "estimate only" disclaimer manages expectations
 */

import React from 'react';
import '../styles/ResponseTimeEstimate.css';

/**
 * Response time configuration by urgency level
 * 
 * Each level includes:
 * - range: Human-readable time range
 * - icon: Visual indicator
 * - message: Additional context
 */
const RESPONSE_TIMES = {
  high: {
    range: '1-2 hours',
    icon: '🚨',
    message: 'Priority queue - urgent attention'
  },
  medium: {
    range: '24-48 hours',
    icon: '⏰',
    message: 'Standard review process'
  },
  low: {
    range: '2-5 business days',
    icon: '📋',
    message: 'Routine handling'
  }
};

/**
 * ResponseTimeEstimate Component
 * 
 * @param {Object} props
 * @param {string} props.urgency - 'high' | 'medium' | 'low'
 * @param {string} props.category - Optional: category may affect estimates
 */
function ResponseTimeEstimate({ urgency, category }) {
  // Normalize urgency to lowercase for consistent matching
  const normalizedUrgency = urgency?.toLowerCase() || 'medium';
  
  // Get configuration for this urgency level
  const config = RESPONSE_TIMES[normalizedUrgency] || RESPONSE_TIMES.medium;

  /**
   * Calculate if this might be a weekend submission
   * Weekend submissions may take longer (NGOs often have limited weekend staff)
   */
  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  /**
   * Adjust message if submitted on weekend
   * This helps set realistic expectations
   */
  const getAdjustedMessage = () => {
    if (isWeekend() && normalizedUrgency !== 'high') {
      return `${config.message} • Weekend: may take longer`;
    }
    return config.message;
  };

  return (
    <div className={`response-time response-time--${normalizedUrgency}`}>
      {/* Main time display */}
      <div className="response-time__main">
        <span className="response-time__icon" aria-hidden="true">
          {config.icon}
        </span>
        <div className="response-time__content">
          <span className="response-time__label">Estimated Response</span>
          <span className="response-time__value">{config.range}</span>
        </div>
      </div>

      {/* Additional context */}
      <div className="response-time__details">
        <span className="response-time__message">{getAdjustedMessage()}</span>
        <span className="response-time__disclaimer">
          *Times are estimates and may vary based on volunteer availability
        </span>
      </div>
    </div>
  );
}

export default ResponseTimeEstimate;
