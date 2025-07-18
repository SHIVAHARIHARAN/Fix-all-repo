import React from 'react';

const services = [
  { type: "Plumbing", price: 500 },
  { type: "Electrician", price: 400 },
  { type: "AC Repair", price: 800 }
];

const ServiceList = () => {
  return (
    <div>
      <h2>🛠 Available Services</h2>
      <ul>
        {services.map((s, index) => (
          <li key={index}>
            {s.type} - ₹{s.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
