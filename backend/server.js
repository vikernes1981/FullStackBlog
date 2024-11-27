import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', snippetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
