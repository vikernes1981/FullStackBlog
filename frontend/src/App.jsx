import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CreatePostPage from './components/CreatePostPage';
import PostDetailsPage from './components/PostDetailsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/validate-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then(() => setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomePage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/create"
          element={isLoggedIn ? <CreatePostPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/entries/:id"
          element={isLoggedIn ? <PostDetailsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
