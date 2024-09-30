import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a pool for connecting to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
