import Course from '../models/courseModel.js'
import Lecture from '../models/lectureModel.js'
import User from '../models/userModel.js'

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
        const {id} = req.params.id;
        const courses = await Course.find(id);
        return res.json(courses);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}


export const getAllLectures = async (req,res) =>{
    try{
        const lectures = await Lecture.find({course: req.params.id});
        console.log(lectures);

        const user = await User.findById(req.user._id);
        console.log(user)

        if(user.role === 'admin'){
            return res.json({lectures});
        }

        if(!user.subscription.includes(req.params.id)){
            return res.status(403).json({message: 'You are not subscribed to this course'});
        }
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}