/**
 * Result Helper Functions - Utility functions for the result display
 * 
 * This module contains helper functions used by the ResultDisplay component
 * for automation features like acknowledgement messages and AI confidence.
 */

/**
 * getAcknowledgementMessage - Returns urgency-based acknowledgement message
 * 
 * PURPOSE (AUTOMATION BENEFIT):
 * Automation reduces manual communication overhead by automatically generating
 * appropriate acknowledgement messages based on urgency level. This:
 * - Saves volunteer time (no need to write custom messages)
 * - Ensures consistent communication across all requests
 * - Sets clear expectations for the patient
 * - Reduces patient anxiety by providing immediate feedback
 * 
 * @param {string} urgency - The urgency level: "Low" | "Medium" | "High"
 * @returns {string} The appropriate acknowledgement message
 */
export const getAcknowledgementMessage = (urgency) => {
  const messages = {
    High: 'A volunteer will contact you as soon as possible due to high urgency. Please ensure your contact information is accessible.',
    Medium: 'Your request is under review. You can expect a response within 24–48 hours. We appreciate your patience.',
    Low: 'Your request has been queued and will be reviewed shortly. Our team will reach out within 3-5 business days.'
  };

  // Default to medium if urgency is not recognized
  return messages[urgency] || messages.Medium;
};

/**
 * getAIConfidence - Returns a simulated AI confidence score
 * 
 * WHY CONFIDENCE IS SIMULATED:
 * - Real AI confidence scores require complex model calibration
 * - Displaying confidence helps users understand AI isn't 100% certain
 * - In production, this would come from the actual AI model's output
 * - Simulated values are based on how certain keyword-based classification is
 * 
 * IMPORTANT DISCLAIMER:
 * This is a SIMULATED score for demonstration purposes only.
 * It should NOT be interpreted as medical certainty or diagnostic confidence.
 * 
 * PRODUCTION IMPLEMENTATION:
 * In a real system, confidence would be derived from:
 * - Model's softmax probabilities for classification
 * - Uncertainty estimation techniques
 * - Calibrated confidence scores from the AI service
 * 
 * @param {string} urgency - The urgency level: "Low" | "Medium" | "High"
 * @param {string} category - The issue category
 * @returns {number} A simulated confidence percentage (0-100)
 */
export const getAIConfidence = (urgency, category) => {
  // Base confidence scores - higher for clearer categories
  const categoryConfidence = {
    'Emergency': 92,      // Clear signals usually present in emergencies
    'Medical': 78,        // Medical issues can be more nuanced
    'Mental Health': 72,  // Mental health requires careful interpretation
    'Other': 65          // "Other" is inherently less certain
  };

  // Urgency modifier - extreme urgencies are often clearer
  const urgencyModifier = {
    'High': 8,   // High urgency keywords are usually obvious
    'Medium': 0, // Baseline
    'Low': -5    // Low urgency is sometimes default/uncertain
  };

  // Calculate base score with sensible defaults
  const baseScore = categoryConfidence[category] || 70;
  const modifier = urgencyModifier[urgency] || 0;
  
  // Add small random variation to make it feel more realistic (±3%)
  const variation = Math.floor(Math.random() * 7) - 3;
  
  // Clamp result between 60% and 95% for realism
  const confidence = Math.min(95, Math.max(60, baseScore + modifier + variation));
  
  return confidence;
};

/**
 * copyToClipboard - Copies text to the system clipboard
 * 
 * UX BENEFIT FOR VOLUNTEERS:
 * - Volunteers often need to paste summaries into other systems
 * - One-click copy saves time and reduces errors from manual copying
 * - Immediate feedback confirms the action was successful
 * - Works across all modern browsers with graceful fallback
 * 
 * @param {string} text - The text to copy to clipboard
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export const copyToClipboard = async (text) => {
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers using execCommand
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * formatSummaryForCopy - Formats the result data for clipboard
 * 
 * Creates a nicely formatted text version of the result that can be
 * pasted into emails, notes, or other systems.
 * 
 * @param {Object} result - The result object containing summary and metadata
 * @returns {string} Formatted text for clipboard
 */
export const formatSummaryForCopy = (result) => {
  const lines = [
    '=== Jarurat Care Support Request ===',
    '',
    `Patient: ${result.patientName}`,
    `Category: ${result.category}`,
    `Priority: ${result.urgency}`,
    '',
    'AI Summary:',
    result.summary,
    '',
    '==================================='
  ];
  
  return lines.join('\n');
};
