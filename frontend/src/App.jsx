import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import CreatePostPage from './components/CreatePostPage';
import PostDetailsPage from './components/PostDetailsPage';
import Footer from './components/Footer';
import SnippetsPage from './components/SnippetsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token'); // Check login status from token
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update login status when token changes
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginPage onLogin={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create" element={isLoggedIn ? <CreatePostPage /> : <Navigate to="/login" />} />
          <Route path="/entries/:id" element={<PostDetailsPage /> } />
          <Route path="/snippets" element={isLoggedIn ? <SnippetsPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
