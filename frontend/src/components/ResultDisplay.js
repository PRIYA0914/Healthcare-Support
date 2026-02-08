/**
 * ResultDisplay Component - Shows AI analysis results
 * 
 * Displays the processed patient request with:
 * - Summary of the issue
 * - Urgency level with visual indicator
 * - Option to submit a new request
 */

import React from 'react';
import '../styles/ResultDisplay.css';

/**
 * Maps urgency levels to display properties
 * Each urgency level has a specific color and icon for visual clarity
 */
const URGENCY_CONFIG = {
  Low: {
    className: 'urgency-low',
    icon: '✓',
    description: 'This request has been classified as low priority. You can expect a response within a few days.'
  },
  Medium: {
    className: 'urgency-medium',
    icon: '⚡',
    description: 'This request has been classified as medium priority. We recommend follow-up within 24-48 hours.'
  },
  High: {
    className: 'urgency-high',
    icon: '🚨',
    description: 'This request has been classified as HIGH priority. Immediate attention is recommended.'
  }
};

function ResultDisplay({ result, onNewRequest }) {
  // Get urgency configuration based on the result
  const urgencyConfig = URGENCY_CONFIG[result.urgency] || URGENCY_CONFIG.Medium;

  return (
    <div className="result-display">
      {/* Success Header */}
      <div className="result-header">
        <div className="success-icon">✓</div>
        <h2>Request Submitted Successfully</h2>
        <p>Your support request has been received and analyzed by our AI system.</p>
      </div>

      {/* Result Card */}
      <div className="result-card">
        {/* Patient Info */}
        <div className="result-section">
          <h3>Patient Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{result.patientName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Category:</span>
              <span className="info-value">{result.category}</span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="result-section">
          <h3>AI-Generated Summary</h3>
          <p className="summary-text">{result.summary}</p>
        </div>

        {/* Urgency Level */}
        <div className="result-section">
          <h3>Urgency Classification</h3>
          <div className={`urgency-badge ${urgencyConfig.className}`}>
            <span className="urgency-icon">{urgencyConfig.icon}</span>
            <span className="urgency-level">{result.urgency} Priority</span>
          </div>
          <p className="urgency-description">{urgencyConfig.description}</p>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="next-steps">
        <h3>What Happens Next?</h3>
        <ul>
          <li>Your request has been added to our system</li>
          <li>A healthcare support volunteer will review your case</li>
          <li>You will be contacted based on the urgency level</li>
          <li>For emergencies, please also contact local emergency services</li>
        </ul>
      </div>

      {/* New Request Button */}
      <button 
        className="new-request-button" 
        onClick={onNewRequest}
      >
        Submit Another Request
      </button>
    </div>
  );
}

export default ResultDisplay;
