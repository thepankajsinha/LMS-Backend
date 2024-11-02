import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cors from 'cors';




//load environment variables from.env file
dotenv.config(); 


//environment variables
const PORT = process.env.PORT; //get port from environment variables


//express app setup
const app = express();


//middlewares
app.use(express.json()); //It is used to parse json data from req.body
app.use("/uploads",express.static("uploads"))
app.use(cors());   //enable cors for cross-origin requests


//import all routes
import userRoute from './routes/userRoute.js'
import courseRoute from './routes/courseRoute.js'
import adminRoute from './routes/adminRoute.js'


//use imported routes
app.use('/api', userRoute);
app.use('/api', courseRoute);
app.use('/api', adminRoute);


//start server and connect database
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});