/**
 * Validators - Input validation utilities
 * 
 * Ensures incoming data meets the required format and constraints
 * before processing. Returns null if valid, error message if invalid.
 */

/**
 * Validates patient support request data
 * 
 * @param {Object} data - Form data from the request body
 * @returns {string|null} Error message or null if valid
 */
const validateSupportRequest = ({ name, age, issueCategory, description }) => {
  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return 'Name is required and must be at least 2 characters';
  }

  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters';
  }

  // Validate age
  if (age === undefined || age === null) {
    return 'Age is required';
  }

  const numericAge = Number(age);
  if (isNaN(numericAge) || numericAge < 0 || numericAge > 150) {
    return 'Age must be a valid number between 0 and 150';
  }

  // Validate issue category
  const validCategories = ['Medical', 'Mental Health', 'Emergency', 'Other'];
  if (!issueCategory || !validCategories.includes(issueCategory)) {
    return `Issue category must be one of: ${validCategories.join(', ')}`;
  }

  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    return 'Description is required and must be at least 10 characters';
  }

  if (description.trim().length > 2000) {
    return 'Description must be less than 2000 characters';
  }

  // All validations passed
  return null;
};

module.exports = {
  validateSupportRequest
};
