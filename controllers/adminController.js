import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js";

export const createCourse = async (req, res) => {
  try {
    // Get course data from request body
    const { title, description, price, duration, category, createdBy } =
      req.body;

    const image = req.file;

    // Validate input fields
    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !category ||
      !createdBy
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create a new course object
    await Course.create({
      title,
      description,
      price,
      duration,
      category,
      createdBy,
      image: image?.path,
    });

    return res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const createLecture = async (req, res) => {
  try {
    // Get course data from request params
    const course = await Course.findById(req.params.id);


    // Check if course exists or not
    if (!course)
      return res.status(404).json({
        message: "No Course with this id",
    });

    // Get lecture data from request body
    const { title, description } = req.body;

    //Get Lecture videos from request file
    const file = req.file;

    const lecture = await Lecture.create({
      title,
      description,
      video: file?.path,
      course: course._id,
    });

    res.status(201).json({
      message: "Lecture Created successfully",
      lecture,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getAllStats = async (req, res) => {
  try {
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;
    const stats ={
      totalCourses,
      totalLectures,
      totalUsers,
    }
    res.json(stats);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}