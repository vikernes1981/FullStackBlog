import express from 'express';
import { registerUser, loginUser, validateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // POST /api/register
router.post('/login', loginUser);       // POST /api/login
router.post('/validate-token', validateToken); // POST /api/validate-token

export default router;
