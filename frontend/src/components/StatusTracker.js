/**
 * StatusTracker Component - Visual Request Progress Indicator
 * 
 * PURPOSE:
 * Provides a clear visual representation of where the patient's
 * request stands in the NGO's review workflow. This transparency
 * reduces anxiety and sets clear expectations.
 * 
 * NGO WORKFLOW EXPLANATION:
 * 1. SUBMITTED - Request received and recorded in system
 * 2. UNDER REVIEW - AI has processed, staff is reviewing
 * 3. VOLUNTEER ASSIGNED - A volunteer has taken ownership
 * 
 * Note: For this demo, we always show "Under Review" as the
 * current status since there's no database tracking actual progress.
 * In production, status would be fetched from backend.
 * 
 * UX REASONING:
 * - Horizontal stepper pattern is universally understood
 * - Green checkmarks indicate completed steps
 * - Pulse animation on current step draws attention
 * - Descriptions help first-time users understand the process
 */

import React from 'react';
import '../styles/StatusTracker.css';

/**
 * Workflow steps configuration
 * Each step has an icon, label, and description
 * 
 * ORDER MATTERS: Steps progress left-to-right
 */
const WORKFLOW_STEPS = [
  {
    id: 'submitted',
    icon: '📝',
    label: 'Submitted',
    description: 'Request received'
  },
  {
    id: 'review',
    icon: '🔍',
    label: 'Under Review',
    description: 'AI processed, staff reviewing'
  },
  {
    id: 'assigned',
    icon: '👤',
    label: 'Volunteer Assigned',
    description: 'Help is on the way'
  }
];

/**
 * StatusTracker Component
 * 
 * @param {Object} props
 * @param {string} props.currentStatus - Current step: 'submitted' | 'review' | 'assigned'
 * @param {string} props.urgency - Urgency level affects visual priority
 */
function StatusTracker({ currentStatus = 'review', urgency = 'medium' }) {
  /**
   * Determine step state (completed, current, or pending)
   * Steps before currentStatus are "completed"
   * The currentStatus step is "current"
   * Steps after currentStatus are "pending"
   */
  const getStepState = (stepId) => {
    const stepIndex = WORKFLOW_STEPS.findIndex(s => s.id === stepId);
    const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === currentStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  /**
   * Get urgency-specific messaging
   * High urgency requests show priority messaging
   */
  const getUrgencyMessage = () => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return '🚨 Priority handling - expedited review';
      case 'medium':
        return '📋 Standard review in progress';
      case 'low':
        return '📝 Queued for review';
      default:
        return '';
    }
  };

  return (
    <div className="status-tracker">
      {/* Header with urgency indicator */}
      <div className="status-tracker__header">
        <h4 className="status-tracker__title">📍 Request Status</h4>
        {urgency && (
          <span className={`status-tracker__urgency status-tracker__urgency--${urgency.toLowerCase()}`}>
            {getUrgencyMessage()}
          </span>
        )}
      </div>

      {/* Progress Steps */}
      <div className="status-tracker__steps">
        {WORKFLOW_STEPS.map((step, index) => {
          const state = getStepState(step.id);
          
          return (
            <React.Fragment key={step.id}>
              {/* Individual Step */}
              <div className={`status-step status-step--${state}`}>
                {/* Step Circle/Icon */}
                <div className="status-step__circle">
                  {state === 'completed' ? (
                    <span className="status-step__check">✓</span>
                  ) : (
                    <span className="status-step__icon">{step.icon}</span>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="status-step__content">
                  <span className="status-step__label">{step.label}</span>
                  <span className="status-step__description">{step.description}</span>
                </div>
              </div>

              {/* Connector Line (except after last step) */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className={`status-connector status-connector--${
                  getStepState(WORKFLOW_STEPS[index + 1].id) !== 'pending' ? 'active' : 'inactive'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Informational footer */}
      <p className="status-tracker__note">
        💡 You'll receive updates as your request progresses
      </p>
    </div>
  );
}

export default StatusTracker;
