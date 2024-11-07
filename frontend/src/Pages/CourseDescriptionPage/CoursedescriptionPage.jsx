import React, { useEffect } from "react";
import "./CoursedescriptionPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";

function CoursedescriptionPage({ user }) {
  const params = useParams();
  const navigate = useNavigate();

  const { course, getCourseByID } = CourseData();

  useEffect(() => {
    getCourseByID(params.courseId);
  }, [params.courseId]);

  const checkoutHandler = async () => {
    // Implement the logic to handle the checkout process
    // This could involve sending a payment request to the backend or using a payment gateway
    navigate(`/course/payment/${course._id}`);
  };
  return (
    <div className="course-container">
      <img
        src={`http://localhost:5000/${course.image}`}
        className="course-image"
        alt="Course"
      />
      <div className="course-info">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <p className="course-price">Price: ₹ {course.price}</p>
        <p className="course-creator">Created by: {course.createdBy}</p>
        <p className="course-duration">Duration: {course.duration} Hours</p>

        {user && user.subscription.includes(course._id) ? (
          <button onClick={() => navigate(`/course/study/${course._id}`)}>
            Study
          </button>
        ) : (
          <button onClick={checkoutHandler}>Buy Now</button>
        )}
      </div>
    </div>
  );
}

export default CoursedescriptionPage;
