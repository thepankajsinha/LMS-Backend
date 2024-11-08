import React, { useEffect } from 'react'
import "./StudyPage.css"
import { useNavigate, useParams, Link} from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'

const StudyPage = ({ user }) => {
  const params = useParams();

  const { getCourseByID, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.courseId))
    return navigate("/");

  useEffect(() => {
    getCourseByID(params.courseId)
  }, []);
  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`http://localhost:5000/${course.image}`} alt="" width={350} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} hours</h5>
          <Link to={`/lectures/${course._id}`}>
            <h2>Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default StudyPage;