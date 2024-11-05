import React from "react";
import "./CoursePage.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../Components/CourseCard/CourseCard";

function CoursePage() {
  const { courses } = CourseData();
  console.log(courses);
  return (
    <div>
      <div className="course-heading">
        <h1>
          Our <span>Course</span>
        </h1>
      </div>

      <div className="course-container">
        {courses && courses.length > 0 ? courses.map((e) => (
          <CourseCard key={e._id} courses={e}/>
        )) : <p>No courses Yet</p>}
      </div>
    </div>
  );
}

export default CoursePage;
