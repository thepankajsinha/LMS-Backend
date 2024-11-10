import React, { useEffect, useState } from "react";
import "./LecturePage.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function LecturePage({ user }) {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [show, setShow] = useState(false);
  const params = useParams();

  async function getAllLectures() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lectures/${params.courseId}`, // Ensure params.courseId exists in the route
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLectures(data.lectures);
      console.log(data.lectures);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getLectureByID(lectureId) {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lecture/${lectureId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLecture(data.lecture);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllLectures();
  }, []);

  return (
    <div className="lecture-page">
      <div className="left">
        {lecture.video ? (
          <>
            <video
              src={`http://localhost:5000/${lecture.video}`}
              width={"100%"}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              autoPlay
            ></video>
            <h1>{lecture.title}</h1>
            <h3>{lecture.description}</h3>
          </>
        ) : (
          <h1>Please Select a Lecture</h1>
        )}
      </div>

      <div className="right">
        {user && user.role === "admin" && (
          <button className="common-btn" onClick={() => setShow(!show)}>
            {show ? "Close" : "Add Lecture +"}
          </button>
        )}

        {show && (
          <div className="lecture-form">
            <h2>Add Lecture</h2>
            <form onSubmit={submitHandler}>
              <label htmlFor="text">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="text">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <input
                type="file"
                placeholder="choose video"
                onChange={changeVideoHandler}
                required
              />

              {videoPrev && (
                <video src={videoPrev} alt="" width={300} controls></video>
              )}

              <button type="submit" className="common-btn">
                Add
              </button>
            </form>
          </div>
        )}
        {
          lectures && lectures.length > 0 ? lectures.map((e, i) =>(
            <>
                <div onClick={()=> getLectureByID(e._id)} key={i} className="lecture-number">
                      {i+1} {e.title}
                </div>
            </>
          ) ) : <p>No Lectures yet</p>
        }
      </div>
      
    </div>
  );
}

export default LecturePage;
