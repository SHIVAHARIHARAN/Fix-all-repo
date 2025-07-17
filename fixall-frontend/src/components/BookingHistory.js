import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/bookingHistory.css'; 
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/user/${username}`);
        setBookings(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch booking history:', err);
      }
    };

    if (username) fetchHistory();
  }, [username]);

  const formatDate = (dateStr) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="booking-history-wrapper">
      <h2>📜 Booking History</h2>
      {bookings.length === 0 ? (
        <p className="empty-history">No bookings found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{formatDate(b.date)}</td>
                <td>{b.serviceType}</td>
                <td>{b.address}, {b.city}, {b.state}</td>
                <td>
                  <span className={`status-badge status-${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;
