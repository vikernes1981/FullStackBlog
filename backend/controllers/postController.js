import pool from '../db.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM entries');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const {user_id, title, content} = req.body || {};
  console.log(req.body);
  if (!title || !content || !user_id) {
    console.log(title + content + user_id);  
    return res.status(400).json({ error: 'Missing title, content, or user_id' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO entries (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [user_id, title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'UPDATE entries SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM entries WHERE id = $1', [id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
