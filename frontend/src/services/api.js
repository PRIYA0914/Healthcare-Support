/**
 * API Service - Handles communication with the backend
 * 
 * Centralizes all API calls and provides consistent error handling.
 * Uses environment variable for API URL or falls back to localhost.
 */

// API base URL - uses environment variable or localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Submits a patient support request to the backend
 * 
 * @param {Object} requestData - Patient form data
 * @param {string} requestData.name - Patient's full name
 * @param {number} requestData.age - Patient's age
 * @param {string} requestData.issueCategory - Category of the issue
 * @param {string} requestData.description - Detailed description of the issue
 * @returns {Promise<Object>} API response with success status and data/error
 */
export const submitSupportRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/support-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Parse response JSON
    const data = await response.json();

    // Return the response data directly
    // The backend already structures it as { success, data/error }
    return data;

  } catch (error) {
    // Network or parsing error
    console.error('API Error:', error.message);
    
    return {
      success: false,
      error: 'Unable to connect to the server. Please check your connection and try again.'
    };
  }
};

/**
 * Health check endpoint to verify backend connectivity
 * Useful for debugging connection issues
 * 
 * @returns {Promise<Object>} Health check response
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
