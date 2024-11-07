import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import {Toaster, toast} from 'react-hot-toast'
const CourseContext = createContext();

export const CourseContextProvider = ({children}) =>{
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);


    //get all courses
    async function getAllCourses() {
        try {
            const {data} = await axios.get("http://localhost:5000/api/course/all");
            setCourses(data);
            
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getCourseByID(courseId) {
        try {
            const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
            setCourse(response.data[0]);
            
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    
    return <CourseContext.Provider value={{courses, getAllCourses, getCourseByID, course}}>
        {children}
        <Toaster/>
    </CourseContext.Provider>
}

export const CourseData = () => useContext(CourseContext)