import React from "react";
import "./AccountPage.css";

function AccountPage({ name, email }) {
  name = "Jane Doe";
  email = "jane.doe@example.com";
  return (
    <div className="main">
      <div className="profile-card">
        <div className="profile-content">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{email}</p>
          <button className="dashboard-button">Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
