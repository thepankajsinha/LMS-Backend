import Course from '../models/courseModel.js'
import Lecture from '../models/lectureModel.js'
import User from '../models/userModel.js'
import { rm } from 'fs';
import { promisify } from "util";
import fs from "fs";
import { instance } from '../index.js';
import crypto from "crypto";
import {Payment} from "../models/paymentModel.js";

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







export const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({_id: req.user.subscription });
        return res.json(courses);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}



export const checkout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.courseId);

        if(user.subscription.includes(course._id)){
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }

        const options ={
            amount: Number(course.price * 100),
            currency: "INR",
        };

        const order = await instance.orders.create(options);

        res.status(200).json({order, course})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}







export const paymentVerification = async (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      const user = await User.findById(req.user._id);
  
      const course = await Course.findById(req.params.courseId);
  
      user.subscription.push(course._id);
  
      await user.save();
  
      res.status(200).json({
        message: "Course Purchased Successfully",
      });
    } else {
      return res.status(400).json({
        message: "Payment Failed",
      });
    }
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    
  };


