import React, { useEffect, useState } from "react";
import "./CoursedescriptionPage.css";
import { useParams, useNavigate} from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import {toast} from "react-hot-toast";
import axios from "axios";

function CoursedescriptionPage({ user }) {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { course, getCourseByID, getAllCourses } = CourseData();
  const {userProfile} = UserData();

  useEffect(() => {
    getCourseByID(params.courseId);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    // Implement the logic to handle the checkout process
    const {data:{order},} = await axios.post(`http://localhost:5000/api/course/checkout/${params.courseId}`, {}, {
      headers: {
        token,
      },
    });

    const options = {
      key: "rzp_test_pvfszfNL3HPjDd",
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Learnify", //your business name
      description: "Just one step left to learn",
      order_id: order.id,
      
      handler: async function (response) {
        const{razorpay_order_id, razorpay_payment_id, razorpay_signature} = response;
        try {
          const {data} = await axios.post(`http://localhost:5000/api/verification/${params.courseId}`, {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          }, {
            headers: {
              token,
            },
          });
          await userProfile();
          await getAllCourses();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      },
      theme:{
        color: "#0146D1"
      }
    };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
  };

  
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </>
  );
}

export default CoursedescriptionPage;


