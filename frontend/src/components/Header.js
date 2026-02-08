/**
 * Header Component - Application header with branding
 * 
 * Displays the NGO name and tagline at the top of the page.
 * Uses minimal, clean design appropriate for healthcare context.
 */

import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">❤️</span>
          <h1>Jarurat Care</h1>
        </div>
        <p className="tagline">Healthcare Support for Communities in Need</p>
      </div>
    </header>
  );
}

export default Header;
