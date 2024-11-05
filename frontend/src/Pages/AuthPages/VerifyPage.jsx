import React, { useState } from 'react';
import './Auth.css';
import { UserData } from '../../context/UserContext';
import {useNavigate} from "react-router-dom"

function VerifyPage() {
  const [otp, setOtp] = useState('');
  const {verifyUser} = UserData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyUser(otp, navigate)
  };

  return (
    <div className="register-container"> {/* Reusing the same class for styling */}
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="number"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e)=> setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Verify</button>
      </form>
    </div>
  );
}

export default VerifyPage;
