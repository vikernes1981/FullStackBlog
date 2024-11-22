import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Define authentication routes
router.post('/register', registerUser); // POST /api/register
router.post('/login', loginUser);       // POST /api/login

export default router;
