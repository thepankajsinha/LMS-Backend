import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="log">Learnify</div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/account"}>Account</Link>
        <Link to={"/login"} className="button-32">Login</Link>
        <Link to={"/register"} className="button-85">Sign Up</Link>
      </div>
    </header>
  );
}

export default Header;
