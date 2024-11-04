import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import CoursePage from "./Pages/CoursePage/CoursePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import RegisterPage from "./Pages/AuthPages/RegisterPage";
import VerifyPage from "./Pages/AuthPages/VerifyPage";

function App() {
  return (
    <div className="app-div">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/courses" element={<CoursePage/> } />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/account" element={<AccountPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/verify" element={<VerifyPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
