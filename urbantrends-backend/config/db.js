import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function connectDb(req, res) {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully');
        return connection;
    } catch (error) {
        return res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
}

export default connectDb;