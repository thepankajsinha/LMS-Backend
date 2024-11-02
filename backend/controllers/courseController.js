import Course from '../models/courseModel.js'
import Lecture from '../models/lectureModel.js'
import User from '../models/userModel.js'
import { rm } from 'fs';
import { promisify } from "util";
import fs from "fs";

export const getAllCourses = async (req,res) =>{
    try{
        const courses = await Course.find({});
        return res.json(courses);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}


export const getCourseByID = async (req,res) =>{
    try{
        const courses = await Course.find({_id: req.params.CourseId});
        return res.json(courses);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}


export const getAllLectures = async (req,res) =>{
    try{
        const lectures = await Lecture.find({course: req.params.CourseId});
        console.log(lectures);

        const user = await User.findById(req.user._id);
        console.log(user)

        if(user.role === 'admin'){
            return res.json({lectures});
        }

        if(!user.subscription.includes(req.params.id)){
            return res.status(403).json({message: 'You are not subscribed to this course'});
        }
        return res.json({lectures});
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}


export const getLectureByID = async (req,res) =>{
    try{
        const lecture = await Lecture.findById({_id: req.params.LectureID});

        const user = await User.findById(req.user._id);

        if(user.role === 'admin'){
            return res.json({lecture});
        }

        if(!user.subscription.includes(req.params.id)){
            return res.status(403).json({message: 'You are not subscribed to this course'});
        }
        return res.json({lecture});
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}


export const deleteLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.LectureID);

        if (!lecture) {
            return res.status(404).json({ error: "Lecture not found" });
        }

        // Remove the video file first
        rm(lecture.video, async (err) => {
            if (err) {
                res.status(500).json({ error: "Error deleting video file" });
            }

            // Once the video file is removed, delete the lecture from the database
            await lecture.deleteOne();

            res.json({ message: "Lecture deleted successfully" });
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


const unlinkAsync = promisify(fs.unlink);


export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        const lectures = await Lecture.find({ course: course._id });
      
        await Promise.all(
          lectures.map(async (lecture) => {
            await unlinkAsync(lecture.video);
            console.log("video deleted");
          })
        );
      
        rm(course.image, () => {
          console.log("image deleted");
        });
      
        await Lecture.find({ course: req.params.id }).deleteMany();
      
        await course.deleteOne();
      
        await User.updateMany({}, { $pull: { subscription: req.params.id } });
      
        res.json({
          message: "Course Deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
