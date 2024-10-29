import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config(); 

const app = express();

app.use(express.json());  // for parsing json data

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server is working fine...');
});

import userRoute from './routes/userRoute.js'
app.use('/api', userRoute);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});