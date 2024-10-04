import pg from "pg";
import dotenv from 'dotenv';

const { Pool } = pg;

// Load environment variables
dotenv.config();

// Create a pool for connecting to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the entries table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    image TEXT,
    content TEXT NOT NULL
  );
`;

// pool.query(createTableQuery)
//   .then(() => console.log("Table 'entries' created successfully"))
//   .catch((err) => console.error("Error creating table 'entries':", err));
//   // Insert dummy entries into the entries table
//   const insertDummyEntriesQuery = `
//     INSERT INTO entries (title, date, image, content) VALUES
//     ('First Entry', '2023-01-01', 'https://example.com/image1.jpg', 'This is the content of the first entry.'),
//     ('Second Entry', '2023-02-01', 'https://example.com/image2.jpg', 'This is the content of the second entry.'),
//     ('Third Entry', '2023-03-01', 'https://example.com/image3.jpg', 'This is the content of the third entry.');
//   `;

//   pool.query(insertDummyEntriesQuery)
//     .then(() => console.log("Dummy entries inserted successfully"))
//     .catch((err) => console.error("Error inserting dummy entries:", err));
export default pool;
