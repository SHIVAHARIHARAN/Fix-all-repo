// src/pages/LandingPage.js
import React from 'react';
import '../styles/landing.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>🧰 Welcome to FixAll</h1>
        <p>Your one-stop platform to book trusted local services</p>

        <div className="landing-buttons">
          <Link to="/user-auth" className="btn user-btn">User Login / Signup</Link>
          <Link to="/admin-auth" className="btn admin-btn">Admin Login / Signup</Link>
        </div>
      </div>

      <div className="landing-info">
        <h2>💡 Why Choose FixAll?</h2>
        <ul>
          <li>✔️ Easy Booking for Home Services</li>
          <li>✔️ Trusted & Verified Professionals</li>
          <li>✔️ Real-time Booking Status</li>
          <li>✔️ Admin Panel for Service Management</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
