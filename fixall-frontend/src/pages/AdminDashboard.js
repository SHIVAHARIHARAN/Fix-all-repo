import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminBookings from '../components/AdminBookings';
import AdminUserList from '../components/AdminUserList';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings'); // default to bookings

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin-auth');
  };

  if (!localStorage.getItem('adminLoggedIn')) {
    navigate('/admin-auth');
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🛠 Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Toggle buttons */}
      <div className="admin-tab-buttons">
        <button
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          📋 Bookings
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 User Management
        </button>
      </div>

      {/* Tab content */}
      <div className="admin-content-area">
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'users' && <AdminUserList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
