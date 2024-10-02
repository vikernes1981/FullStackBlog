import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Define routes
router.get('/posts', getPosts);           // GET /api/posts
router.post('/posts', createPost);         // POST /api/posts
router.put('/posts/:id', updatePost);     // PUT /api/posts/:id
router.delete('/posts/:id', deletePost);  // DELETE /api/posts/:id

export default router;
