import React from "react";
import "./CourseCard.css";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function CourseCard({ courses }) {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={`http://localhost:5000/${courses.image}`} />
      </div>


      <div className="course-content">
        <h2 className="course-title">{courses.title}</h2>
        <p className="course-description">{courses.description}</p>
        <div className="course-info">
          <span className="course-duration">
            Duration: {courses.duration} hours
          </span>
          <p className="course-createdBy">Created by: {courses.createdBy}</p>
        </div>
        <div className="course-price">₹{courses.price}</div>


        {isAuth ? (
            //is user logged in then this code will be executed
          <>
            {user && user.role !== "admin" ? (  //if user logged in and he is not an admin then this code will be executed
              <>
                {user.subscription.includes(courses._id) ? ( 
                  <button onClick={() => navigate(`/course/study/${courses._id}`)}>Study</button>  //if user logged in and he has a subscription then this code will be executed
                ) : (
                  <button onClick={() => navigate(`/course/${courses._id}`)}>Buy Now</button>  //if user logged in but he does not have this course in subscription then this code will be executed
                )}
              </>
            ) : ( 
              <button onClick={() => navigate(`/course/study/${courses._id}`)}>Study</button>    //if user logged in and he is an admin then this code will be executed
            )}
          </>
        ) : (
            //if user not logged in then this code will be executed
          <button onClick={() => navigate("/login")}>buy Now</button>
        )}

                {/* if user is admin then this code will be executed */}
                {user && user.role === "admin" && (
                    <div className="delete-button">
                        <button>Delete</button>
                    </div>)}
      </div>


    </div>
  );
}

export default CourseCard