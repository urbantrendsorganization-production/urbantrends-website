import connectDb from "./config/database.js";
import express from "express";
import dotenv from "dotenv";
import serviceRoutes from './src/Routes/ServiceRoutes.js';
import cors from 'cors';

dotenv.config();


// init express
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://developers.urbantrends.dev",
]



// middleware
app.use(express.json());

// connect to database
connectDb();

app.use (
    cors ({
        origin: (origin, callback) =>{
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error ("Not allowed by cors"));
            }
        },
        credentials: true,
    })

);

// routes init
app.use('/api', serviceRoutes);


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});