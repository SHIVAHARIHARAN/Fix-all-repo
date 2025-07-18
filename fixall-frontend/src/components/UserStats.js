import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const UserStats = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/bookings/user/${username}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to load booking stats', err));
  }, [username]);

  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const lastBooking = bookings[bookings.length - 1];

  return (
    <div className="stats-card">
      <h2>📊 Booking Summary</h2>
      <p><strong>Total Bookings:</strong> {total}</p>
      <p><strong>Pending:</strong> {pending}</p>
      <p><strong>Completed:</strong> {completed}</p>

      {lastBooking && (
        <button
          onClick={() => alert(`Rebook service: ${lastBooking.serviceType}`)}
          className="edit-btn"
        >
          🔁 Rebook Last Service
        </button>
      )}
    </div>
  );
};

export default UserStats;
