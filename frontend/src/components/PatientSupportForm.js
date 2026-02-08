/**
 * PatientSupportForm Component - Main form for patient support requests
 * 
 * Collects patient information including:
 * - Name, Age, Issue Category, and Description
 * 
 * Validates inputs before submission and sends data to backend API.
 */

import React, { useState } from 'react';
import { submitSupportRequest } from '../services/api';
import '../styles/PatientSupportForm.css';

// Available issue categories for the dropdown
const ISSUE_CATEGORIES = [
  { value: '', label: 'Select a category' },
  { value: 'Medical', label: 'Medical' },
  { value: 'Mental Health', label: 'Mental Health' },
  { value: 'Emergency', label: 'Emergency' },
  { value: 'Other', label: 'Other' }
];

function PatientSupportForm({ onSuccess }) {
  // Form field states
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    issueCategory: '',
    description: ''
  });

  // UI states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  /**
   * Handles input field changes
   * Updates form state and clears field-specific errors
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  /**
   * Validates all form fields
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        newErrors.age = 'Please enter a valid age (0-150)';
      }
    }

    // Issue category validation
    if (!formData.issueCategory) {
      newErrors.issueCategory = 'Please select a category';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Please provide at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates inputs, sends API request, and handles response
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Prepare data for API (convert age to number)
      const requestData = {
        ...formData,
        age: Number(formData.age)
      };

      // Send request to backend
      const response = await submitSupportRequest(requestData);

      if (response.success) {
        // Call success callback with the result data
        onSuccess(response.data);
      } else {
        setApiError(response.error || 'Failed to submit request');
      }
    } catch (error) {
      setApiError('Unable to connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="support-form" onSubmit={handleSubmit}>
      {/* API Error Display */}
      {apiError && (
        <div className="api-error">
          <span className="error-icon">⚠️</span>
          {apiError}
        </div>
      )}

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={errors.name ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      {/* Age Field */}
      <div className="form-group">
        <label htmlFor="age">Age *</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="0"
          max="150"
          className={errors.age ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.age && <span className="field-error">{errors.age}</span>}
      </div>

      {/* Issue Category Dropdown */}
      <div className="form-group">
        <label htmlFor="issueCategory">Issue Category *</label>
        <select
          id="issueCategory"
          name="issueCategory"
          value={formData.issueCategory}
          onChange={handleChange}
          className={errors.issueCategory ? 'error' : ''}
          disabled={isSubmitting}
        >
          {ISSUE_CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.issueCategory && (
          <span className="field-error">{errors.issueCategory}</span>
        )}
      </div>

      {/* Description Textarea */}
      <div className="form-group">
        <label htmlFor="description">Describe Your Issue *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Please describe your health concern or issue in detail..."
          rows="5"
          className={errors.description ? 'error' : ''}
          disabled={isSubmitting}
        />
        {errors.description && (
          <span className="field-error">{errors.description}</span>
        )}
        <span className="char-count">
          {formData.description.length} / 2000 characters
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Processing...
          </>
        ) : (
          'Submit Request'
        )}
      </button>
    </form>
  );
}

export default PatientSupportForm;
