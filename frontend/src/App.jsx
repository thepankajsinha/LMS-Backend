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
import { UserData } from "./context/UserContext";
import CoursedescriptionPage from "./Pages/CourseDescriptionPage/CoursedescriptionPage";
import PaymentSuccessPage from "./Pages/PaymentSuccessPage/PaymentSuccessPage";

function App() {
  const {isAuth, user} = UserData();
  return (
    <div className="app-div">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/courses" element={<CoursePage/> } />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/account" element={isAuth?<AccountPage user={user}/> : <LoginPage/>} />
          <Route path="/login" element={isAuth?<HomePage/> : <LoginPage/>} />
          <Route path="/register" element={isAuth?<HomePage/> : <RegisterPage/>} />
          <Route path="/verify" element={isAuth?<HomePage/> : <VerifyPage/>} />
          <Route path="/course/:courseId" element={isAuth ? <CoursedescriptionPage user={user}/> : <LoginPage/>} />
          <Route path="/payment-successs" element={isAuth ? <PaymentSuccessPage user={user}/> : <LoginPage/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
