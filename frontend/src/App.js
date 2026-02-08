/**
 * App Component - Main Application Container
 * 
 * Manages the application state and renders the main layout
 * with the patient support form and result display.
 */

import React, { useState } from 'react';
import Header from './components/Header';
import PatientSupportForm from './components/PatientSupportForm';
import ResultDisplay from './components/ResultDisplay';
import './styles/App.css';

function App() {
  // State to store the AI-processed result
  const [result, setResult] = useState(null);
  
  // State to track if we should show the result section
  const [showResult, setShowResult] = useState(false);

  /**
   * Handles the successful submission of a support request
   * Updates state to display the AI analysis result
   */
  const handleSubmissionSuccess = (data) => {
    setResult(data);
    setShowResult(true);
  };

  /**
   * Resets the form to submit a new request
   */
  const handleNewRequest = () => {
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
              <PatientSupportForm onSuccess={handleSubmissionSuccess} />
            ) : (
              <ResultDisplay 
                result={result} 
                onNewRequest={handleNewRequest} 
              />
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Jarurat Care NGO. All rights reserved.</p>
        <p className="footer-tagline">Bringing healthcare support to those who need it most.</p>
      </footer>
    </div>
  );
}

export default App;
