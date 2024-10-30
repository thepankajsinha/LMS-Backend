import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
    try {
      // Extract token from request headers
      const token = req.headers.token;
  
      // Check if token is present and valid
      if (!token) {
        return res.status(401).json({ error: "Please Login" });
      }
  
      // Verify token and get user data
      const decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decodedData.id);
  
      // If user is not found, send an error
      if (!req.user) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
