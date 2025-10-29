import connectDb from "./config/database.js";
import express from "express";
import dotenv from "dotenv";
import serviceRoutes from './src/Routes/ServiceRoutes.js';
import clientRoutes from './src/Routes/clientRoutes.js';
import serviceTiers from './src/Routes/serviceTiers.js';
import productRoutes from './src/Routes/ProductsRoutes.js'
import cors from 'cors';

dotenv.config();


// init express
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://www.urbantrends.dev",
]


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

// middleware

app.use(express.json());

// routes init
app.use('/api', serviceRoutes);
app.use('/testimony', clientRoutes);
app.use('/tiers', serviceTiers);
app.use('/products', productRoutes);


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});