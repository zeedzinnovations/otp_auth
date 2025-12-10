import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : { rejectUnauthorized: false }
});

async function connectDB() {
  try {
    await pool.connect();
    console.log("Database connected successfully ");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectDB();


pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export default pool;
