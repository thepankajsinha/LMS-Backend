import React from 'react';
import './CourseCard.css';

function CourseCard({ courses }) {
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={`http://localhost:5000/${courses.image}`} />
            </div>
            <div className="course-content">
                <h2 className="course-title">{courses.title}</h2>
                <p className="course-description">{courses.description}</p>
                <div className="course-info">
                    <span className="course-duration">Duration: {courses.duration} hours</span>
                </div>
                <div className="course-price">
                    ₹{courses.price}
                </div>
                <p className="course-createdBy">Created by: {courses.createdBy}</p>
                <button className="enroll-button">Buy Now</button>
            </div>
        </div>
    );
}

export default CourseCard;
