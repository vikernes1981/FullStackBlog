import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ onAddEntryClick, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to login after logout
    window.location.reload(); // Refresh the page
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <button
          className="bg-blue-500 px-4 py-2 rounded mr-2"
          onClick={onAddEntryClick}
        >
          Add Entry
        </button>
        <button
          className="bg-red-500 px-4 py-2 rounded"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired, // Prop validation for setIsLoggedIn
};

export default Header;
