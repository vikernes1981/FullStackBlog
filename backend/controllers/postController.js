import db from '../db.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM entries');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a post by ID
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const row = await db.get('SELECT * FROM entries WHERE id = ?', id);
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, date, image, content } = req.body || {};
  if (!title || !date || !image || !content) {
    return res.status(400).json({ error: 'Missing title, date, image, or content' });
  }
  try {
    const result = await db.run(
      'INSERT INTO entries (title, date, image, content) VALUES (?, ?, ?, ?)',
      title, date, image, content
    );
    res.json({ id: result.lastID });
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
    const result = await db.run(
      'UPDATE entries SET title = ?, content = ? WHERE id = ?',
      title, content, id
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.run('DELETE FROM entries WHERE id = ?', id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
