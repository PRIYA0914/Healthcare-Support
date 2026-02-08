/**
 * ResultDisplay Component - Enhanced AI Analysis Results View (v2.0)
 * 
 * This component displays the processed patient request with all enhanced features:
 * 
 * ORIGINAL FEATURES (v1.0):
 * 1. Priority Badge with Color Coding - Visual urgency indicator
 * 2. Auto-Acknowledgement Message - Urgency-based automated response
 * 3. Healthcare Emergency Disclaimer - Medical safety notice
 * 4. Edit Request & Reset Flow - Allows correction or new submission
 * 5. FAQ Section - Chatbot concept substitute
 * 6. AI Confidence Indicator - Simulated confidence percentage
 * 7. Copy Summary to Clipboard - One-click copy functionality
 * 
 * NEW FEATURES (v2.0):
 * 8. Status Tracker - Visual workflow progress indicator
 * 9. Estimated Response Time - Dynamic wait time calculation
 * 10. Emergency Action - Prominent help for high urgency cases
 * 11. Card-Based Layout - Improved visual hierarchy
 * 
 * UX PHILOSOPHY:
 * - Information is grouped into logical "cards" for better scanability
 * - Most critical info (urgency, emergency) appears at top
 * - Action buttons are always visible for easy access
 * - Animations provide smooth transitions without distraction
 */

import React, { useState, useEffect } from 'react';
import {
  getAcknowledgementMessage,
  getAIConfidence,
  copyToClipboard,
  formatSummaryForCopy
} from '../utils/resultHelpers';
import PriorityBadge from './PriorityBadge';
import HealthcareDisclaimer from './HealthcareDisclaimer';
import FAQAccordion from './FAQAccordion';
import StatusTracker from './StatusTracker';
import ResponseTimeEstimate from './ResponseTimeEstimate';
import EmergencyAction from './EmergencyAction';
import CategoryChip from './CategoryChip';
import '../styles/ResultDisplay.css';

function ResultDisplay({ result, onNewRequest, onEditRequest, onShowToast }) {
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
    
    // Show toast notification if available
    if (onShowToast) {
      onShowToast({
        message: success ? 'Summary copied to clipboard!' : 'Failed to copy. Please try again.',
        type: success ? 'success' : 'error'
      });
    }
    
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
    <div className="result-display result-display--animated">
      {/* Success Header - Confirmation of submission */}
      <div className="result-header">
        <div className="success-icon">✓</div>
        <h2>Request Submitted Successfully</h2>
        <p>Your support request has been received and analyzed by our AI system.</p>
      </div>

      {/* FEATURE 10: Emergency Action - Only shows for HIGH urgency
          Healthcare responsibility: Ensure critical cases get proper attention */}
      <EmergencyAction urgency={result.urgency} />

      {/* FEATURE 3: Healthcare Emergency Disclaimer
          Always visible to ensure users understand this is support, not medical advice */}
      <HealthcareDisclaimer />

      {/* ====== CARD-BASED LAYOUT START ====== */}
      <div className="result-cards">
        
        {/* CARD 1: Patient Info & Urgency - Most Critical Information */}
        <div className="result-card result-card--primary">
          <div className="card-header">
            <h3>📋 Patient Information</h3>
          </div>
          <div className="card-body">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{result.patientName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Category</span>
                <span className="info-value">
                  <CategoryChip value={result.category} />
                </span>
              </div>
            </div>
            
            {/* Priority Badge - Inline with patient info for quick assessment */}
            <div className="urgency-inline">
              <span className="info-label">Priority Level</span>
              <PriorityBadge urgency={result.urgency} size="medium" />
            </div>
          </div>
        </div>

        {/* CARD 2: AI Summary - The core analysis output */}
        <div className="result-card result-card--summary">
          <div className="card-header">
            <h3>🤖 AI-Generated Summary</h3>
            {/* FEATURE 7: Copy Summary Button */}
            <button 
              className={`copy-button ${copyStatus ? 'copy-button--' + copyStatus : ''}`}
              onClick={handleCopySummary}
              aria-label="Copy summary to clipboard"
            >
              {copyStatus === 'success' ? '✓ Copied!' : 
               copyStatus === 'error' ? '✗ Failed' : '📋 Copy'}
            </button>
          </div>
          <div className="card-body">
            <p className="summary-text">{result.summary}</p>
            
            {/* FEATURE 6: AI Confidence Indicator */}
            {aiConfidence !== null && (
              <div className="ai-confidence">
                <div className="ai-confidence__header">
                  <span className="ai-confidence__label">AI Confidence:</span>
                  <span className="ai-confidence__value">{aiConfidence}%</span>
                  <span className="ai-confidence__disclaimer">(simulated)</span>
                </div>
                <div className="ai-confidence__bar">
                  <div 
                    className="ai-confidence__fill"
                    style={{ width: `${aiConfidence}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 3: Response Time & Next Steps */}
        <div className="result-card result-card--timeline">
          <div className="card-header">
            <h3>⏱️ Response Timeline</h3>
          </div>
          <div className="card-body">
            {/* FEATURE 9: Estimated Response Time */}
            <ResponseTimeEstimate 
              urgency={result.urgency} 
              category={result.category} 
            />
            
            {/* FEATURE 2: Auto-Acknowledgement */}
            <div className="acknowledgement-message">
              <span className="acknowledgement-icon">💬</span>
              <p>{acknowledgementMessage}</p>
            </div>
          </div>
        </div>

        {/* CARD 4: Status Tracker - Visual workflow */}
        <div className="result-card result-card--status">
          <StatusTracker 
            currentStatus="review" 
            urgency={result.urgency} 
          />
        </div>

      </div>
      {/* ====== CARD-BASED LAYOUT END ====== */}

      {/* What's Next Section - Actionable next steps */}
      <div className="next-steps">
        <h3>📌 What Happens Next?</h3>
        <ul>
          <li>✅ Your request has been added to our priority queue</li>
          <li>👀 A healthcare support volunteer will review your case</li>
          <li>📞 You will be contacted based on the urgency level</li>
          <li>🚨 For emergencies, please also contact local emergency services</li>
        </ul>
      </div>

      {/* FEATURE 4: Edit Request & Reset Flow */}
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

      {/* FEATURE 5: FAQ Accordion Section */}
      <FAQAccordion />
    </div>
  );
}

export default ResultDisplay;
