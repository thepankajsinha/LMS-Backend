import React from "react";
import "./DashboardPage.css";
import { CourseData } from "../../context/CourseContext"; // Ensure the context is exported as a hook
import CourseCard from "../../Components/CourseCard/CourseCard";

const DashboardPage = () => {
    const { mycourse } = CourseData();  // Make sure CourseData is a hook and returns mycourse
    console.log(mycourse);
    return (
        <div className="dashboard">
            <h1>My Courses</h1>
            <div className="course-list">
                {mycourse && mycourse.length > 0 ? (
                    mycourse.map((e) => (
                        <CourseCard key={e._id} courses={e} />
                    ))
                ) : (
                    <p className="no-courses">No Courses Enrolled Yet</p>
                )}  
            </div>
        </div>
    );
};

export default DashboardPage;
