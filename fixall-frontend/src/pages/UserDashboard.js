import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import BookingHistory from '../components/BookingHistory';
import ProfileDetails from '../components/ProfileDetails';
import UserStats from '../components/UserStats'; 
import CalendarWidget from '../components/CalendarWidget';
import LoyaltyRewards from '../components/LoyaltyRewards';
import ReferralCard from '../components/ReferralCard';
import SupportChat from '../components/SupportChat';
import UpcomingServices from '../components/UpcomingServices';
import '../styles/dashboard.css';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('username');
    navigate('/');
  };

  if (!localStorage.getItem('userLoggedIn')) {
    navigate('/user-auth');
    return null;
  }

  return (
    <div className="dashboard-wrapper">

      
      <aside className="sidebar">
        <div className="nav-buttons">
          <h2 className="brand-title">FixAll</h2>
          <button onClick={() => setActiveTab('home')}>🏠 Home</button>
          <button onClick={() => setActiveTab('book')}>🛠 Book Service</button>
          <button onClick={() => setActiveTab('profile')}>👤 Profile</button>
          <button onClick={() => setActiveTab('history')}>📘 Booking History</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
        
      </aside>

      
      <main className="dashboard-main">
        
        {(activeTab === 'home' || activeTab === '') && (
          <div className="form-center-container">
            <div className="welcome-container">
              <div className="welcome-card">
                <h2>Welcome, {username}!</h2>
                <p>Thanks for joining FixAll. You can manage your bookings, view history, or contact support here.</p>
                <button onClick={() => setActiveTab('book')}>+ Book New Service</button>
              </div>
              <UpcomingServices />
              <LoyaltyRewards /> 
              <ReferralCard/>
               
               
            </div>
            <CalendarWidget />
            
            
          </div>
          
        )}
        {activeTab === 'book' && (
          <div className="form-center-container">
            <div className="form-container" style={{ position: 'relative' }}>
              <button className="form-close-btn" onClick={() => setActiveTab('')}>❌</button>
              <BookingForm />
            </div>
             
          </div>
        )}
        {activeTab === 'profile' && (
        <div className="profile-dashboard-container">
        <ProfileDetails />
        <UserStats />
       </div>
        )}
        {activeTab === 'history' && <BookingHistory />}


        
        <SupportChat />
      </main>
    </div>

    
  );
};

export default UserDashboard;
