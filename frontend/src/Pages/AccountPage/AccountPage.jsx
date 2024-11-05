import React from "react";
import "./AccountPage.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AccountPage({user}) {
  const { setIsAuth, setUser } = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div className="main">
      {user && (<div className="profile-card">
        <div className="profile-content">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <button className="dashboard-button">Dashboard</button>
          <button onClick={logoutHandler} className="dashboard-button">Logout<IoMdLogOut /></button>
        </div>
      </div>)}
    </div>
  );
}

export default AccountPage;
