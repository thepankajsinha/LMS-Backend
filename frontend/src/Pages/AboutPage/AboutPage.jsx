import React from 'react';
import './AboutPage.css';
import AboutUsImage from './AboutUsImage.jpg';

const AboutPage = () => {
    return (
        <section className="about-us-section">
            <div className="content">
                <h2>About <span className="highlight">Us</span></h2>
                <p>
                At Learnify, we’re on a mission to make high-quality, practical learning accessible for everyone. Our courses are designed to help you gain real-world skills that empower you to excel in your career and personal growth. Whether you're looking to master a new skill, change careers, or simply satisfy your curiosity, Learnify is here to guide your journey.
                </p>
                <ul>
                    <li>Experienced and passionate instructors</li>
                    <li>Comprehensive course offerings in various fields</li>
                    <li>Flexible learning options</li>
                    <li>Global community of learners and mentors</li>
                </ul>
            </div>
            <div className="image-container">
                <img src={AboutUsImage} alt="About Us" />
            </div>
        </section>
    );
};

export default AboutPage;
