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
// Get a post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM entries WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, date, image, content } = req.body || {};
  console.log(req.body);
  if (!title || !date || !image || !content) {
    console.log(title + date + image + content);
    return res.status(400).json({ error: 'Missing title, date, image, or content' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO entries (title, date, image, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, date, image, content]
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
