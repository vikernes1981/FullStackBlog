import pg from "pg";
import dotenv from 'dotenv';

const { Pool } = pg;

// Load environment variables
dotenv.config();

// Create a pool for connecting to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
