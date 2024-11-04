import React from 'react';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-item logo-section">
                    <h2>Learn<span className="highlight">ify</span></h2>
                    <p>Build career and gain skills with courses, certificates, and degrees from the world's best institutions and mentors.</p>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-linkedin-in"></i>
                        <i className="fab fa-pinterest"></i>
                    </div>
                </div>
                <div className="footer-item">
                    <h3>Category</h3>
                    <ul>
                        <li>Privacy & Policy</li>
                        <li>Terms & Condition</li>
                        <li>Customer Support</li>
                        <li>For Business</li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Refer A Friend</li>
                        <li>Scholarship</li>
                        <li>Marketing</li>
                        <li>Free Course</li>
                    </ul>
                </div>
                <div className="footer-item">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>info@yourmail.com</li>
                        <li>support@yourmail.com</li>
                        <li>01234567899</li>
                        <li>09876543210</li>
                        <li>2875662000</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
