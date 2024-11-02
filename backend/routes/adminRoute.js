import express from 'express';
import { createCourse, createLecture } from '../controllers/adminController.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from '../middlewares/multer.js';
import { deleteCourse, deleteLecture } from '../controllers/courseController.js';

const router = express.Router();

router.post('/course/new', isAuth, isAdmin, uploadFiles,createCourse)
router.post('/course/:id', isAuth, isAdmin, uploadFiles,createLecture)
router.delete('/course/:id', isAuth, isAdmin, deleteCourse)
router.delete('/lecture/:LectureID', isAuth, isAdmin, uploadFiles, deleteLecture)


export default router;