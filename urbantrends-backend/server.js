import express from 'express';
import connectDb from './config/db.js';
import service_Routes from './products-services/routes/Service_Routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// connect to the database
connectDb()

// service routes
app.use('/api/services', service_Routes);

// running server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});