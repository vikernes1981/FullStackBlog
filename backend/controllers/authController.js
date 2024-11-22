import bcrypt from 'bcrypt';
import db from '../db.js';

// Register a new user
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      username,
      hashedPassword
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err.message);
    if (err.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'Username already exists.' });
    } else {
      res.status(500).json({ error: 'Server error.' });
    }
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Find the user in the database
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error.' });
  }
};
