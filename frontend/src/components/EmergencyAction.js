import React, { useState } from 'react';
import '../styles/EmergencyAction.css';

/**
 * Emergency resources configuration
 * These would be localized in a production app
 */
const EMERGENCY_RESOURCES = [
  {
    name: 'Emergency Services',
    number: '112',
    description: 'For life-threatening emergencies'
  },
  {
    name: 'Ambulance',
    number: '102',
    description: 'Medical emergencies'
  },
  {
    name: 'Mental Health Helpline',
    number: '9152987821',
    description: 'iCall - Psychosocial helpline'
  }
];

/**
 * EmergencyAction Component
 * 
 * Only renders when urgency is HIGH.
 * 
 * @param {Object} props
 * @param {string} props.urgency - Must be 'high' to render
 */
function EmergencyAction({ urgency }) {
  // Only show for high urgency cases
  const isHighUrgency = urgency?.toLowerCase() === 'high';
  
  // Modal visibility state
  const [showModal, setShowModal] = useState(false);

  // Don't render anything if not high urgency
  if (!isHighUrgency) {
    return null;
  }

  /**
   * Opens the emergency modal
   * Uses state to show detailed emergency information
   */
  const handleEmergencyClick = () => {
    setShowModal(true);
  };

  /**
   * Closes the emergency modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Emergency Alert Banner */}
      <div className="emergency-action">
        {/* Warning Icon - Pulsing animation for attention */}
        <div className="emergency-action__alert">
          <span className="emergency-action__pulse"></span>
          <span className="emergency-action__icon">🚨</span>
        </div>

        {/* Message Content */}
        <div className="emergency-action__content">
          <h4 className="emergency-action__title">High Priority Case Detected</h4>
          <p className="emergency-action__text">
            If this is a medical emergency, please seek immediate professional help.
          </p>
        </div>

        {/* Emergency Button */}
        <button 
          className="emergency-action__button"
          onClick={handleEmergencyClick}
          aria-label="View emergency resources"
        >
          <span>🆘</span>
          <span>Emergency Help</span>
        </button>
      </div>

      {/* Emergency Modal */}
      {showModal && (
        <div 
          className="emergency-modal__overlay" 
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-modal-title"
        >
          <div 
            className="emergency-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="emergency-modal__header">
              <h3 id="emergency-modal-title">🚑 Emergency Resources</h3>
              <button 
                className="emergency-modal__close"
                onClick={handleCloseModal}
                aria-label="Close emergency modal"
              >
                ✕
              </button>
            </div>

            {/* Important Disclaimer */}
            <div className="emergency-modal__disclaimer">
              <strong>⚠️ Important:</strong> If you or someone else is in immediate 
              danger, please call emergency services immediately. This portal 
              provides support coordination, not emergency medical care.
            </div>

            {/* Emergency Numbers List */}
            <div className="emergency-modal__resources">
              <h4>Emergency Contact Numbers</h4>
              <ul className="emergency-list">
                {EMERGENCY_RESOURCES.map((resource, index) => (
                  <li key={index} className="emergency-list__item">
                    <div className="emergency-list__info">
                      <span className="emergency-list__name">{resource.name}</span>
                      <span className="emergency-list__desc">{resource.description}</span>
                    </div>
                    <a 
                      href={`tel:${resource.number}`}
                      className="emergency-list__number"
                      aria-label={`Call ${resource.name} at ${resource.number}`}
                    >
                      📞 {resource.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Message */}
            <div className="emergency-modal__safety">
              <p>
                <strong>Jarurat Care</strong> volunteers will prioritize your case, 
                but we are not a replacement for professional emergency services.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="emergency-modal__actions">
              <button 
                className="emergency-modal__understood"
                onClick={handleCloseModal}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmergencyAction;
