// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './styles/layout.css';

import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminAuth from './pages/admin/AdminAuth';
import UserAuth from './pages/user/UserAuth';

function AppWrapper() {
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('userLoggedIn'));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(localStorage.getItem('adminLoggedIn'));

 
  useEffect(() => {
    setIsUserLoggedIn(localStorage.getItem('userLoggedIn'));
    setIsAdminLoggedIn(localStorage.getItem('adminLoggedIn'));
  }, [location]);

  return (
    <div className="App">
     <nav className="navbar">
  {(!isUserLoggedIn && !isAdminLoggedIn) && (
    <>
      <Link to="/">🏠 Home</Link>
      <Link to="/user-auth">👤 User Login/Signup</Link>
      <Link to="/admin-auth">🛠 Admin Login/Signup</Link>
    </>
  )}
</nav>
      <hr />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
