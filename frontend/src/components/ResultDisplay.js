/**
 * ResultDisplay Component - Enhanced AI Analysis Results View
 * 
 * This component displays the processed patient request with all 7 enhanced features:
 * 1. Priority Badge with Color Coding - Visual urgency indicator
 * 2. Auto-Acknowledgement Message - Urgency-based automated response
 * 3. Healthcare Emergency Disclaimer - Medical safety notice
 * 4. Edit Request & Reset Flow - Allows correction or new submission
 * 5. FAQ Section - Chatbot concept substitute
 * 6. AI Confidence Indicator - Simulated confidence percentage
 * 7. Copy Summary to Clipboard - One-click copy functionality
 */

import React, { useState, useEffect } from 'react';
import PriorityBadge from './PriorityBadge';
import HealthcareDisclaimer from './HealthcareDisclaimer';
import FAQAccordion from './FAQAccordion';
import {
  getAcknowledgementMessage,
  getAIConfidence,
  copyToClipboard,
  formatSummaryForCopy
} from '../utils/resultHelpers';
import '../styles/ResultDisplay.css';

function ResultDisplay({ result, onNewRequest, onEditRequest }) {
  // FEATURE 7: Copy to clipboard state
  const [copyStatus, setCopyStatus] = useState(null); // null | 'success' | 'error'

  // FEATURE 6: AI Confidence - calculated once on mount for consistency
  const [aiConfidence, setAiConfidence] = useState(null);

  // Calculate AI confidence on component mount
  // This ensures the same confidence is shown throughout the session
  useEffect(() => {
    const confidence = getAIConfidence(result.urgency, result.category);
    setAiConfidence(confidence);
  }, [result.urgency, result.category]);

  // FEATURE 2: Get automated acknowledgement message based on urgency
  const acknowledgementMessage = getAcknowledgementMessage(result.urgency);

  /**
   * FEATURE 7: Handles copying the summary to clipboard
   * 
   * UX BENEFIT FOR VOLUNTEERS:
   * Volunteers often need to paste summaries into other systems (CRMs, notes, emails).
   * One-click copy saves time and reduces transcription errors.
   */
  const handleCopySummary = async () => {
    const formattedText = formatSummaryForCopy(result);
    const success = await copyToClipboard(formattedText);
    
    setCopyStatus(success ? 'success' : 'error');
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setCopyStatus(null);
    }, 3000);
  };

  /**
   * FEATURE 4: Edit Request Handler
   * Takes user back to form with pre-filled data
   * Allows correction without losing entered information
   */
  const handleEdit = () => {
    if (onEditRequest) {
      onEditRequest();
    }
  };

  /**
   * FEATURE 4: Reset Handler
   * Clears all state and starts fresh
   * Does NOT reload page - maintains SPA experience
   */
  const handleReset = () => {
    if (onNewRequest) {
      onNewRequest();
    }
  };

  return (
    <div className="result-display">
      {/* Success Header */}
      <div className="result-header">
        <div className="success-icon">✓</div>
        <h2>Request Submitted Successfully</h2>
        <p>Your support request has been received and analyzed by our AI system.</p>
      </div>

      {/* FEATURE 3: Healthcare Emergency Disclaimer
          Always visible to ensure users understand this is support, not medical advice */}
      <HealthcareDisclaimer />

      {/* Main Result Card */}
      <div className="result-card">
        {/* Patient Info Section */}
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

        {/* AI Summary Section with Copy Button */}
        <div className="result-section">
          <div className="section-header-with-action">
            <h3>AI-Generated Summary</h3>
            {/* FEATURE 7: Copy Summary Button */}
            <button 
              className="copy-button"
              onClick={handleCopySummary}
              aria-label="Copy summary to clipboard"
            >
              {copyStatus === 'success' ? '✓ Copied!' : 
               copyStatus === 'error' ? '✗ Failed' : '📋 Copy'}
            </button>
          </div>
          <p className="summary-text">{result.summary}</p>
          
          {/* FEATURE 6: AI Confidence Indicator
              Displayed below summary to provide context about AI certainty
              Clearly labeled as simulated to avoid medical misinterpretation */}
          {aiConfidence !== null && (
            <div className="ai-confidence">
              <span className="ai-confidence__label">AI Confidence:</span>
              <span className="ai-confidence__value">{aiConfidence}%</span>
              <span className="ai-confidence__disclaimer">(simulated)</span>
              <div className="ai-confidence__bar">
                <div 
                  className="ai-confidence__fill"
                  style={{ width: `${aiConfidence}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* FEATURE 1: Priority Badge with Color Coding
            Visual urgency indicator helps volunteers quickly identify priority */}
        <div className="result-section">
          <h3>Urgency Classification</h3>
          <div className="urgency-display">
            <PriorityBadge urgency={result.urgency} size="large" />
          </div>
          
          {/* FEATURE 2: Auto-Acknowledgement Message
              Automation reduces manual communication overhead
              Message automatically changes based on urgency level */}
          <div className="acknowledgement-message">
            <p>{acknowledgementMessage}</p>
          </div>
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

      {/* FEATURE 4: Edit Request & Reset Flow
          Two clear actions for different user needs:
          - Edit: Correct mistakes without losing data
          - New Request: Start fresh for a different issue */}
      <div className="action-buttons">
        <button 
          className="action-button action-button--edit"
          onClick={handleEdit}
          aria-label="Edit this request with pre-filled information"
        >
          ✏️ Edit Request
        </button>
        <button 
          className="action-button action-button--new"
          onClick={handleReset}
          aria-label="Submit a new request with empty form"
        >
          ➕ Submit Another Request
        </button>
      </div>

      {/* FEATURE 5: FAQ Accordion Section
          This simulates a chatbot knowledge base for common questions
          Provides instant answers without complex chat infrastructure */}
      <FAQAccordion />
    </div>
  );
}

export default ResultDisplay;
