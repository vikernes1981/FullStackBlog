import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ onAddEntryClick, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Remove token
    setIsLoggedIn(false); // Update authentication state
    navigate('/'); // Redirect to home
    window.location.reload(); // Refresh the page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Home
      </button>

      <div className="flex items-center space-x-4">
        {/* Conditionally render buttons for logged-in users */}
        {onAddEntryClick && (
          <button
            onClick={onAddEntryClick}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Entry
          </button>
        )}
        {setIsLoggedIn && (
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}

        {/* Snippets Button */}
        <button
          onClick={() => navigate('/snippets')}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
        >
          Snippets
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func, // Optional: only for pages needing "Add Entry"
  setIsLoggedIn: PropTypes.func, // Optional: only for logged-in users
};

Header.defaultProps = {
  onAddEntryClick: null, // Default: No "Add Entry" button
  setIsLoggedIn: null,  // Default: No logout button for unlogged users
};

export default Header;
