import React, { useState } from 'react';
import './Auth.css';

function OtpVerify() {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic (e.g., API call)
    console.log('OTP submitted:', otp);
  };

  return (
    <div className="register-container"> {/* Reusing the same class for styling */}
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Verify</button>
      </form>
    </div>
  );
}

export default OtpVerify;
