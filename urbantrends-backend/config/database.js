import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const successMsg = `all system are good sir`

async function connectDb() {
 
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log(`Database connected successfully. ${successMsg}`);
        return connection;
    } catch (error) {
        console.log('Database connection failed:', error);
        process.exit(1);
        
    }
}

export default connectDb;
