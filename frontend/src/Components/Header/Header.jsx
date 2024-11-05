import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Header = () => {
  const { isAuth } = UserData();
  return (
    <header className="header">
      <Link to={"/"} className="logo-text">
        <span>Learnify</span>
      </Link>
      <nav className="nav-links">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/courses"} className="nav-link">
          Course
        </Link>
        <Link to={"/about"} className="nav-link ">
          About
        </Link>
        {isAuth ? (
          <Link to={"/account"} className="nav-link ">
            Account
          </Link>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="sign-in">Sign In</button>
            </Link>
            <Link to={"/register"}>
              <button className="register">Register</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
