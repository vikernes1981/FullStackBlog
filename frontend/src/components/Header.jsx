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
      <button
        onClick={() => navigate('/')}
        className="mr-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600"
      >
        Home
      </button>
      <div>
      <button
        onClick={() => navigate('/snippets')}
        className="mr-2 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
      >
        Snippets
      </button>
        {onAddEntryClick && (
          <button
            onClick={onAddEntryClick}
            className="mr-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Entry
          </button>
        )}
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func, // Optional: only for pages needing "Add Entry"
  setIsLoggedIn: PropTypes.func.isRequired, // Required: logout functionality
};

Header.defaultProps = {
  onAddEntryClick: null, // No "Add Entry" button by default
};

export default Header;
