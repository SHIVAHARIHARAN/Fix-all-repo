import React from 'react';
import '../styles/dashboard.css'; 

const ReferralCard = () => {
  const referralCode = localStorage.getItem('username') + '-FIXALL';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <div className="info-card referral-card">
      <h3>🎁 Refer & Earn Exciting Offers</h3>
      <p>Share your code and earn discounts when friends join FixAll.</p>
      <div className="referral-code-box">
        <code>{referralCode}</code>
        <button onClick={handleCopy}>📋 Copy</button>
      </div>
    </div>
  );
};

export default ReferralCard;
