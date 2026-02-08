/**
 * App Component - Main Application Container (v2.0)
 * 
 * Manages the application state and renders the main layout
 * with the patient support form and result display.
 * 
 * STATE MANAGEMENT:
 * - formData: Stores the submitted form data for edit functionality
 * - result: Stores the AI-processed result
 * - showResult: Controls which view is displayed (form vs result)
 * - toasts: Array of toast notification objects (v2.0)
 * 
 * VERSION 2.0 ADDITIONS:
 * - Toast notification system for user feedback
 * - Smooth transitions between form and result views
 * - Enhanced visual hierarchy with card-based layout
 */

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PatientSupportForm from './components/PatientSupportForm';
import ResultDisplay from './components/ResultDisplay';
import ChatBot from './components/ChatBot';
import { ToastContainer } from './components/Toast';
import './styles/App.css';

/**
 * Default empty form state
 * Used for reset functionality
 */
const INITIAL_FORM_DATA = {
  name: '',
  age: '',
  issueCategory: '',
  description: ''
};

/**
 * Generate unique ID for toasts
 * Simple incrementing counter for this session
 */
let toastId = 0;
const generateToastId = () => ++toastId;

function App() {
  // State to store the submitted form data (for edit functionality)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  
  // State to store the AI-processed result
  const [result, setResult] = useState(null);
  
  // State to track if we should show the result section
  const [showResult, setShowResult] = useState(false);
  
  // FEATURE: Toast notifications
  // Stores array of currently visible toasts
  const [toasts, setToasts] = useState([]);

  /**
   * Shows a toast notification
   * 
   * @param {Object} toast - Toast configuration
   * @param {string} toast.message - The message to display
   * @param {string} toast.type - 'success' | 'error' | 'warning' | 'info'
   * @param {number} toast.duration - Optional custom duration in ms
   */
  const showToast = useCallback((toast) => {
    const newToast = {
      id: generateToastId(),
      message: toast.message,
      type: toast.type || 'info',
      duration: toast.duration || 3000
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  /**
   * Removes a toast notification
   * 
   * @param {number} id - The ID of the toast to remove
   */
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  /**
   * Handles the successful submission of a support request
   * Stores both the form data (for editing) and the AI result
   * Shows a success toast notification
   * 
   * @param {Object} submittedData - The form data that was submitted
   * @param {Object} resultData - The AI-processed result from the backend
   */
  const handleSubmissionSuccess = (submittedData, resultData) => {
    setFormData(submittedData);
    setResult(resultData);
    setShowResult(true);
    
    // Show success toast
    showToast({
      message: 'Request submitted successfully! Our team will review it shortly.',
      type: 'success'
    });
  };

  /**
   * FEATURE 4: Edit Request Handler
   * 
   * Takes user back to the form with pre-filled data.
   * This preserves the entered information allowing for corrections
   * without requiring the user to re-enter everything.
   * 
   * UX REASONING:
   * - Users often notice typos or want to add details after submission
   * - Pre-filling prevents data loss and increases user satisfaction
   * - Maintains form state in React instead of relying on browser history
   */
  const handleEditRequest = () => {
    setShowResult(false);
    // formData is preserved, so the form will show with existing values
  };

  /**
   * FEATURE 4: Reset Handler (Submit Another Request)
   * 
   * Completely clears all state for a fresh form.
   * Does NOT reload the page - maintains SPA experience.
   * 
   * UX REASONING:
   * - User wants to submit a different request (perhaps for another person)
   * - Clean slate without the overhead of a page refresh
   * - React state reset is instantaneous
   */
  const handleNewRequest = () => {
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="app">
      {/* Toast Notifications - Fixed position overlay */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Introduction Section */}
          <section className="intro-section">
            <h2>Patient Support Request</h2>
            <p>
              Welcome to Jarurat Care's support portal. Fill out the form below to 
              submit your healthcare concern. Our AI-powered system will analyze your 
              request and help prioritize your care needs.
            </p>
          </section>

          {/* Form and Result Display */}
          <div className="content-wrapper">
            {!showResult ? (
              <PatientSupportForm 
                onSuccess={handleSubmissionSuccess}
                initialData={formData}
              />
            ) : (
              <ResultDisplay 
                result={result}
                onNewRequest={handleNewRequest}
                onEditRequest={handleEditRequest}
                onShowToast={showToast}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Jarurat Care NGO. All rights reserved.</p>
        <p className="footer-tagline">Bringing healthcare support to those who need it most.</p>
      </footer>

      {/* FAQ Chatbot - Always visible as floating button */}
      <ChatBot />
    </div>
  );
}

export default App;
