import React from 'react';
import './CourseCard.css';

function CourseCard({ image, title, description, duration, price,createdBy }) {
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={image} alt={title} />
            </div>
            <div className="course-content">
                <h2 className="course-title">{title}</h2>
                <p className="course-description">{description}</p>
                <div className="course-info">
                    <span className="course-duration">Duration: {duration}</span>
                </div>
                <div className="course-price">
                    ₹{price}
                </div>
                <p className="course-createdBy">Created by: {createdBy}</p>
                <button className="enroll-button">Buy Now</button>
            </div>
        </div>
    );
}

export default CourseCard;
