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

    const accessToken = jwt.sign(
      { name, email, password: hashedPassword,otp },process.env.SECRET_KEY,
      { expiresIn: "5m" }
    );

    const data = {
      name,
      otp,
    };
    console.log(data)
    await sendVerificationEmail(email, "Learnify", data);
    res.status(201).json({ message: "OTP sent to your mail", accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





export const verifyUser = async (req, res) => {
  try {
    const {otp, accessToken} = req.body;
    const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);

    // Check if the OTP is provided
    if(!otp) {
      return res.status(400).json({ message: "Please provide OTP" });
    }

    // Check if the access token is expired or not
    if(!decodedAccessToken) {
      return res.status(401).json({ message: "OTP expired" });
    }
    // Verify the OTP
    if(decodedAccessToken.otp != otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    await User.create({
      name: decodedAccessToken.name,
      email: decodedAccessToken.email,
      password: decodedAccessToken.password,
    })
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: `Welcome back ${user.name}`, accessToken, user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};








export const userProfile = async (req, res) => {
  try {
    // Check if req.user exists (set by isAuth middleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};