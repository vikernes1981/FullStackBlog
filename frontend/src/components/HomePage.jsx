import { useState, useEffect } from 'react';
import Header from './Header';
import EntryList from './EntryList';
import AddEntryModal from './AddEntryModal';

function HomePage({ setIsLoggedIn }) {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLocalIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/entries'); // Fetching posts
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON response
        console.log('Fetched entries:', data); // Log the fetched data
        setEntries(data); // Update the state with fetched entries
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleAddEntryClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveEntry = (entry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    setIsModalOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false); // Update authentication state
    setLocalIsLoggedIn(false);
  };

  const handleEntryClick = (entryId) => {
    console.log('Entry clicked:', entryId); // Implement navigation or detailed view logic
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-600 to-black">
      <div className="flex justify-center mb-6">
        {/* <img
          src="https://c2.staticflickr.com/4/3187/2741458748_5c6f5fc4da_b.jpg"
          alt="Login Illustration"
          className="h-100% w-100% sm:h-40 sm:w-40 lg:w-60 lg:h-60"
        /> */}
      </div>
      <div className="flex justify-center mb-6">
        {/* Only show Header with buttons if the user is logged in */}
        {isLoggedIn && (
          <Header
            onAddEntryClick={handleAddEntryClick}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </div>
      <EntryList entries={entries} onEntryClick={handleEntryClick} />
      {/* Add Entry Modal is only accessible if logged in */}
      {isLoggedIn && (
        <AddEntryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEntry}
          entries={entries}
        />
      )}
      
    </div>
    
  );
}

export default HomePage;
