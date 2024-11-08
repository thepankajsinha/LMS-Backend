import React from 'react';
import './PaymentSuccessPage.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useParams , Link} from 'react-router-dom';

const PaymentSuccessPage = ({user}) => {
    const params = useParams()
  return (
    <div className="success-container">
      {user && (
        <div className="success-card">
        <AiOutlineCheckCircle className="success-icon" />
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment. Your transaction was completed successfully.</p>
        <p>Transaction ID: <strong>{params.id}</strong></p>
        <Link to={`/${user._id}/dashboard`} className="home-button"><button>Go to Dashboard</button></Link>
      </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
