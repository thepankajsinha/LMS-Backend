import express from 'express';
import { getAllCourses, getAllLectures, getCourseByID } from '../controllers/courseController.js';
import {isAuth} from '../middlewares/isAuth.js'

const router = express.Router();

router.get('/course/all', getAllCourses)
router.get('/course/:id', getCourseByID)
router.get('/lectures/:id',isAuth ,getAllLectures)


export default router;