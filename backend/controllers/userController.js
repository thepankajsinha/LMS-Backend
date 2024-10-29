import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../middlewares/sendVerificationEmail.js";

export const register = async (req, res) => {
  try {
    // Get name, email and password from request body
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(Math.random() * 1000000);
    console.log("Generated OTP:", otp);

    const accessToken = jwt.sign(
      { name, email, password: hashedPassword },process.env.SECRET_KEY,
      { expiresIn: "5m" }
    );

    const data = {
      name,
      otp,
    };

    await sendVerificationEmail(email, "E learning", data);
    res.status(201).json({ message: "OTP sent to your mail", accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
