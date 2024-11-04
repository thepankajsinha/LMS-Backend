import React from "react";
import "./CoursePage.css";
import CourseCard from "../../Components/CourseCard/CourseCard";
import courseImage from "./HeroImage.png";

function CoursePage() {
  return (
    <div>
      <div className="course-heading">
        <h1>Our <span>Course</span></h1>
      </div>

      <CourseCard
        image={courseImage}
        title="Graphic Design"
        description="Become a Graphic Designer - Zero to Hero"
        duration="12 hrs 30 mins"
        price = "100"
        createdBy="John Doe"
      />
    </div>
  );
}

export default CoursePage;
