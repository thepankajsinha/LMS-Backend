import express from 'express';
import { getAllCourses, getAllLectures, getCourseByID, getLectureByID, getMyCourses } from '../controllers/courseController.js';
import {isAuth} from '../middlewares/isAuth.js'

const router = express.Router();

router.get('/course/all', getAllCourses)
router.get('/course/:CourseId', getCourseByID)
router.get('/lectures/:CourseId',isAuth ,getAllLectures)
router.get('/lecture/:LectureID',isAuth ,getLectureByID)
router.get('/mycourse',isAuth ,getMyCourses)


export default router;