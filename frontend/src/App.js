/**
 * App Component - Main Application Container
 * 
 * Manages the application state and renders the main layout
 * with the patient support form and result display.
 * 
 * STATE MANAGEMENT (FEATURE 4 - Edit/Reset Flow):
 * - formData: Stores the submitted form data for edit functionality
 * - result: Stores the AI-processed result
 * - showResult: Controls which view is displayed (form vs result)
 * 
 * This clear separation of "form state" and "result state" enables:
 * - Editing a request without losing entered information
 * - Resetting to a fresh form without page reload
 */

import React, { useState } from 'react';
import Header from './components/Header';
import PatientSupportForm from './components/PatientSupportForm';
import ResultDisplay from './components/ResultDisplay';
import ChatBot from './components/ChatBot';
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

function App() {
  // State to store the submitted form data (for edit functionality)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  
  // State to store the AI-processed result
  const [result, setResult] = useState(null);
  
  // State to track if we should show the result section
  const [showResult, setShowResult] = useState(false);

  /**
   * Handles the successful submission of a support request
   * Stores both the form data (for editing) and the AI result
   * 
   * @param {Object} submittedData - The form data that was submitted
   * @param {Object} resultData - The AI-processed result from the backend
   */
  const handleSubmissionSuccess = (submittedData, resultData) => {
    setFormData(submittedData);
    setResult(resultData);
    setShowResult(true);
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
