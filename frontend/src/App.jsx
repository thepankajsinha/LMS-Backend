import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VerifyOTP from "./Pages/Auth/VerifyOTP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/verify" element={<VerifyOTP/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
