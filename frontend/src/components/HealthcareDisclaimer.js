/**
 * HealthcareDisclaimer Component - Medical safety disclaimer
 * 
 * PURPOSE:
 * Displays a prominent but non-intrusive disclaimer informing users that
 * this tool does not replace professional medical advice.
 * 
 * HEALTHCARE RESPONSIBILITY & COMPLIANCE MINDSET:
 * - NGOs providing health-related services must be transparent about limitations
 * - This disclaimer protects both the organization and the patient
 * - It ensures users understand this is a support tool, not a diagnostic service
 * - Encourages users to seek professional help for emergencies
 * - Demonstrates compliance awareness even in a concept application
 * 
 * LEGAL CONSIDERATIONS:
 * In production, this disclaimer would be reviewed by legal counsel to ensure
 * it meets local healthcare communication regulations.
 */

import React from 'react';
import '../styles/HealthcareDisclaimer.css';

function HealthcareDisclaimer() {
  return (
    <div 
      className="healthcare-disclaimer"
      role="alert"
      aria-label="Important medical disclaimer"
    >
      <div className="healthcare-disclaimer__icon" aria-hidden="true">
        ⚕️
      </div>
      <div className="healthcare-disclaimer__content">
        <p className="healthcare-disclaimer__title">
          Important Medical Notice
        </p>
        <p className="healthcare-disclaimer__text">
          This tool does not replace professional medical advice, diagnosis, or treatment. 
          Always consult with qualified healthcare providers for medical concerns.
        </p>
        <p className="healthcare-disclaimer__emergency">
          <strong>In case of emergency, please contact local emergency services (e.g., 112/911) immediately.</strong>
        </p>
      </div>
    </div>
  );
}

export default HealthcareDisclaimer;
