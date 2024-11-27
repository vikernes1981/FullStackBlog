import { useState, useEffect } from 'react';
import Header from './Header';
import EntryList from './EntryList';
import AddEntryModal from './AddEntryModal';

function HomePage({ setIsLoggedIn, isLoggedIn }) {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/entries');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddEntryClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveEntry = (entry) => {
    setEntries([...entries, entry]);
    setIsModalOpen(false);
  };

  const handleEntryClick = (entryId) => {
    console.log('Entry clicked:', entryId);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-600 to-black">
      {isLoggedIn && (
        <Header
          onAddEntryClick={handleAddEntryClick}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      <EntryList entries={entries} onEntryClick={handleEntryClick} />
      {isModalOpen && (
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
