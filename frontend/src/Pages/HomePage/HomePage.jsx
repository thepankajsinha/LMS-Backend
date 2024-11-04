import React from "react";
import "./HomePage.css";
import Button from "../../Components/Button/Button";
import { Link} from "react-router-dom";
import HeroImage from "./HeroImage.jpg";
import CoursePage from "../CoursePage/CoursePage";

function HomePage() {
  return (
    <>
      <div className="hero-content">
        <div className="text-content">
          <h1>Learnify <br /> <span>Learning Simplify</span></h1>
          <p>
            Explore our flexible learning courses and choose the path to success
            that{" "}
          </p>
          <div className="btn">
            <Link to={"/courses"} className="hero-button">
              <button>Get Started</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={HeroImage} alt="Student" />
        </div>
      </div>

       <CoursePage/>

      <div className="all-course-btn">
        <Link to={"/courses"}><Button text="All Courses" /></Link>
      </div>

    </>
  );
}

export default HomePage;
