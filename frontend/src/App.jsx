import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'; 
import SignUpPage from './components/SignUpPage';
import CreatePostPage from './components/CreatePostPage'; // Import Create Post
import PostDetailsPage from './components/PostDetailsPage'; // Import Post Details
import UpdateEntryPage from './components/UpdateEntryModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />

        <Route
          path="/create"
          element={isLoggedIn ? <CreatePostPage /> : <Navigate to="/login" />} // Protected Route
        />
        <Route
          path="/entries/:id"
          element={isLoggedIn ? <PostDetailsPage /> : <Navigate to="/login" />} // Protected Route
        />
        <Route
          path="/entries/:id"
          element={isLoggedIn ? <UpdateEntryPage /> : <Navigate to="/login" />} // Protected Route
        />
      </Routes>
    </Router>
  );
}

export default App;
