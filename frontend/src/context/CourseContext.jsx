import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
const CourseContext = createContext();

export const CourseContextProvider = ({children}) =>{
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [mycourse, setMycourse] = useState([]);


    //get all courses
    async function getAllCourses() {
        try {
            const {data} = await axios.get("http://localhost:5000/api/course/all");
            setCourses(data);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    //get course by id
    async function getCourseByID(courseId) {
        try {
            const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
            setCourse(response.data[0]);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    //get user course
    async function getMyCourse() {
        try {
            const {data} = await axios.get(`http://localhost:5000/api/mycourse`, {
                headers:{
                    token: localStorage.getItem("token"),
                },
            });
            setMycourse(data);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAllCourses();
        getMyCourse();
    }, [])
    
    return <CourseContext.Provider value={{courses, getAllCourses, getCourseByID, course, mycourse ,getMyCourse}}>
        {children}
        <Toaster/>
    </CourseContext.Provider>
}

export const CourseData = () => useContext(CourseContext)