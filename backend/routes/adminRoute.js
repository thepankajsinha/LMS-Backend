import express from 'express';
import { createCourse, createLecture } from '../controllers/adminController.js';
import { isAdmin, isAuth } from '../middlewares/isAuth.js';
import { uploadFiles } from '../middlewares/multer.js';

const router = express.Router();

router.post('/course/new', isAuth, isAdmin, uploadFiles,createCourse)
router.post('/course/:id', isAuth, isAdmin, uploadFiles,createLecture)


export default router;