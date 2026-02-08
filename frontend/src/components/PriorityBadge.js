/**
 * PriorityBadge Component - Visual urgency indicator
 * 
 * PURPOSE:
 * This reusable component converts urgency text into a visual badge with
 * color-coding to help NGO volunteers quickly identify priority levels.
 * 
 * WHY VISUAL PRIORITY HELPS NGO VOLUNTEERS:
 * - Volunteers often review multiple requests in quick succession
 * - Color-coded badges allow instant recognition without reading text
 * - Reduces cognitive load and speeds up triage decisions
 * - High-contrast colors ensure accessibility for all users
 * 
 * WHY COLOR-CODING IMPROVES RESPONSE SPEED:
 * - Red immediately signals critical cases requiring instant attention
 * - Yellow/amber indicates moderate urgency for next-day follow-up
 * - Green shows non-urgent cases that can be queued normally
 * - This traffic-light pattern is universally understood
 */

import React from 'react';
import '../styles/PriorityBadge.css';

/**
 * Badge configuration for each urgency level
 * Colors are chosen for accessibility (WCAG AA contrast compliance)
 */
const BADGE_CONFIG = {
  Low: {
    className: 'priority-badge--low',
    icon: '✓',
    label: 'Low Priority',
    // Green indicates safe/non-urgent - universally understood
    ariaLabel: 'Low priority - non-urgent request'
  },
  Medium: {
    className: 'priority-badge--medium',
    icon: '⚡',
    label: 'Medium Priority',
    // Yellow/amber signals caution - needs attention but not immediate
    ariaLabel: 'Medium priority - requires attention within 24-48 hours'
  },
  High: {
    className: 'priority-badge--high',
    icon: '🚨',
    label: 'High Priority',
    // Red immediately draws attention - critical/urgent
    ariaLabel: 'High priority - requires immediate attention'
  }
};

/**
 * PriorityBadge - Displays urgency level as a colored badge
 * 
 * @param {string} urgency - The urgency level: "Low" | "Medium" | "High"
 * @param {string} size - Optional size variant: "small" | "default" | "large"
 */
function PriorityBadge({ urgency, size = 'default' }) {
  // Fallback to Medium if invalid urgency is provided
  const config = BADGE_CONFIG[urgency] || BADGE_CONFIG.Medium;
  
  // Combine base class with urgency-specific and size classes
  const className = `priority-badge ${config.className} priority-badge--${size}`;

  return (
    <span 
      className={className}
      role="status"
      aria-label={config.ariaLabel}
    >
      <span className="priority-badge__icon" aria-hidden="true">
        {config.icon}
      </span>
      <span className="priority-badge__label">
        {config.label}
      </span>
    </span>
  );
}

export default PriorityBadge;
