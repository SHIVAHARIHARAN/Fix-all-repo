
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/loyalty.css';

const LoyaltyRewards = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/bookings/user/${username}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to load bookings', err));
  }, [username]);

  const total = bookings.length;

  const nextMilestone = 5 - (total % 5);
  const progress = (total % 5) * 20;

  const tier = total >= 10 ? 'Gold' : total >= 5 ? 'Silver' : 'Bronze';
  const rewardMsg = nextMilestone === 0
    ? "🎉 You've unlocked a reward!"
    : `Book ${nextMilestone} more service(s) to unlock your next reward.`;

  return (
    <div className="loyalty-card">
      <h2>🎁 Loyalty & Rewards</h2>
      <p><strong>Tier:</strong> {tier}</p>
      <p><strong>Total Bookings:</strong> {total}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{rewardMsg}</p>
    </div>
  );
};

export default LoyaltyRewards;
