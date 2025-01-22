import express from 'express';
import { loginUser, register, userProfile, verifyUser } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/user/register", register)
router.post("/user/verify", verifyUser)
router.post("/user/login", loginUser)
router.get("/user/profile", isAuth, userProfile)

export default router;