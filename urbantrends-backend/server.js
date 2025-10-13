import express from 'express';
import connectDb from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// connect to the database
connectDb()

// running server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});