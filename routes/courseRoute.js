import express from 'express';
import { checkout, getAllCourses, getAllLectures, getCourseByID, getLectureByID, getMyCourses, paymentVerification } from '../controllers/courseController.js';
import {isAuth} from '../middlewares/isAuth.js'

const router = express.Router();

router.get('/course/all', getAllCourses)
router.get('/course/:CourseId', getCourseByID)
router.get('/lectures/:courseId',isAuth ,getAllLectures)
router.get('/lecture/:lectureId',isAuth ,getLectureByID)
router.get('/mycourse',isAuth ,getMyCourses)
router.post('/course/checkout/:courseId',isAuth ,checkout)
router.post('/verification/:courseId',isAuth , paymentVerification)


export default router; 