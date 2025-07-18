import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/adminBookings.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  return (
    <div className="admin-booking-table">
      <h2>📋 All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Contact</th>
            <th>Date</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.customerName}</td>
              <td>{b.serviceType}</td>
              <td>{b.contact}</td>
              <td>{b.date}</td>
              <td>{b.address}, {b.city}, {b.state}</td>

              
              <td>
                <span className={`status-badge status-${b.status.toLowerCase()}`}>
                  {b.status}
                </span>
              </td>

             
              <td>
                {b.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(b.id, 'Confirmed')}>✅ Approve</button>{' '}
                    <button onClick={() => updateStatus(b.id, 'Rejected')}>❌ Reject</button>
                  </>
                )}
                {b.status === 'Confirmed' && (
                  <button onClick={() => updateStatus(b.id, 'Completed')}>✔️ Mark Complete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
