import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Define routes
router.get('/entries', getPosts);           // GET /api/posts
router.post('/entries', createPost);         // POST /api/posts
router.put('/entries/:id', updatePost);     // PUT /api/posts/:id
router.delete('/entries/:id', deletePost);  // DELETE /api/posts/:id

export default router;
