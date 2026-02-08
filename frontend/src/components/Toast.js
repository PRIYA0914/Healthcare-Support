
/**
 * Toast Component - Lightweight Notification System
 * 
 * PURPOSE:
 * Provides non-intrusive feedback for user actions without
 * blocking the interface. Essential for confirming successful
 * submissions and copy actions.
 * 
 * UX REASONING:
 * - Toasts appear briefly and auto-dismiss (no user action needed)
 * - Positioned at top-right to avoid blocking main content
 * - Color-coded by type (success, error, info, warning)
 * - Subtle entrance/exit animations reduce jarring transitions
 * 
 * USAGE:
 * <Toast 
 *   message="Request submitted successfully!" 
 *   type="success" 
 *   onClose={() => setShowToast(false)} 
 * />
 */

import React, { useEffect, useState } from 'react';
import '../styles/Toast.css';

/**
 * Toast notification types with corresponding icons
 * Icons use emojis for zero-dependency solution
 */
const TOAST_ICONS = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
};

/**
 * Auto-dismiss duration in milliseconds
 * 3 seconds is optimal: long enough to read, short enough not to annoy
 */
const AUTO_DISMISS_MS = 3000;

/**
 * Toast Component
 * 
 * @param {Object} props
 * @param {string} props.message - The notification text to display
 * @param {string} props.type - Toast type: 'success' | 'error' | 'warning' | 'info'
 * @param {function} props.onClose - Callback when toast should be removed
 * @param {number} props.duration - Optional custom duration in ms
 */
function Toast({ message, type = 'info', onClose, duration = AUTO_DISMISS_MS }) {
  // Track visibility for exit animation
  const [isVisible, setIsVisible] = useState(true);

  /**
   * Auto-dismiss effect
   * Sets a timer to hide the toast after the specified duration
   * The exit animation triggers before the actual removal
   */
  useEffect(() => {
    // Start exit animation slightly before removal
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300); // 300ms before removal for exit animation

    // Actually remove the toast
    const removeTimer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    // Cleanup timers if component unmounts early
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  /**
   * Manual close handler
   * Allows users to dismiss the toast early if desired
   */
  const handleClose = () => {
    setIsVisible(false);
    // Small delay to allow exit animation
    setTimeout(() => {
      if (onClose) onClose();
    }, 200);
  };

  return (
    <div 
      className={`toast toast--${type} ${isVisible ? 'toast--visible' : 'toast--hidden'}`}
      role="alert"
      aria-live="polite"
    >
      {/* Icon - Visual indicator of toast type */}
      <span className="toast__icon" aria-hidden="true">
        {TOAST_ICONS[type]}
      </span>

      {/* Message content */}
      <span className="toast__message">{message}</span>

      {/* Close button for accessibility */}
      <button 
        className="toast__close" 
        onClick={handleClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * ToastContainer Component
 * 
 * Manages multiple toasts and their stacking.
 * Use this when you need to show multiple notifications.
 * 
 * @param {Object} props
 * @param {Array} props.toasts - Array of toast objects
 * @param {function} props.removeToast - Callback to remove a toast by id
 */
export function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default Toast;
