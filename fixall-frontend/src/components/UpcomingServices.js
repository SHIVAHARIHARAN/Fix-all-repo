import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingServices = () => {
  const [upcoming, setUpcoming] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/user/${username}`);
        const today = new Date();

        const filtered = res.data.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return bookingDate >= today;
        });

        // Sort by nearest date first
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

        setUpcoming(filtered);
      } catch (err) {
        console.error('Failed to load upcoming bookings', err);
      }
    };

    if (username) fetchUpcoming();
  }, [username]);

  return (
    <div className="upcoming-box">
      <h3>🔔 Upcoming Services</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming bookings found.</p>
      ) : (
        <ul>
          {upcoming.map((b, i) => (
            <li key={i}>
              <strong>{b.serviceType}</strong> on <em>{b.date}</em> — {b.city}, {b.state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingServices;
