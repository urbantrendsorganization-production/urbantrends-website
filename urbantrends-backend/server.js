import connectDb from "./config/database.js";
import express from "express";
import dotenv from "dotenv";
import serviceRoutes from './src/Routes/ServiceRoutes.js';

dotenv.config();


// init express
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// connect to database
connectDb();

// routes init
app.use('/api', serviceRoutes);


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});