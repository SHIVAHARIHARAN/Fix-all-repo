import React, { useState } from 'react';
import '../styles/bookingform.css';
import axios from 'axios';

const stateCityMap = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"]
};

const BookingForm = () => {
  const username = localStorage.getItem('username'); // ✅ Use logged-in user
  const [contact, setContact] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [address, setAddress] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      customerName: username, // ✅ Match with login
      contact,
      serviceType: service,
      date,
      state: selectedState,
      city: selectedCity,
      address
    };

    try {
      await axios.post('http://localhost:8080/api/bookings', bookingData);
      setSuccessMsg('✅ Booking confirmed!');
      setContact('');
      setService('');
      setDate('');
      setSelectedState('');
      setSelectedCity('');
      setAddress('');
    } catch (err) {
      alert('❌ Booking failed. Please try again.');
      console.error(err);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3 className="form-title">📅 Book a Service</h3>

      {successMsg && <p className="success-msg">{successMsg}</p>}

      <input
        type="tel"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />

      <select value={service} onChange={(e) => setService(e.target.value)} required>
        <option value="">Select Service</option>
        <option value="Electrician">Electrician</option>
        <option value="Plumber">Plumber</option>
        <option value="Carpenter">Carpenter</option>
        <option value="AC Repair">AC Repair</option>
        <option value="Painting">Painting</option>
        <option value="Pest Control">Pest Control</option>
        <option value="Cleaning">Cleaning</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <select value={selectedState} onChange={handleStateChange} required>
        <option value="">Select State</option>
        {Object.keys(stateCityMap).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
        <option value="">Select City</option>
        {stateCityMap[selectedState]?.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={3}
        required
      ></textarea>

      <button type="submit">Book Service</button>
    </form>
  );
};

export default BookingForm;
