import React, { useState, useEffect } from 'react';
import SnippetList from './SnippetList';
import AddSnippetModal from './AddSnippetModal';
import UpdateSnippetModal from './UpdateSnippetModal'; // Import UpdateSnippetModal
import { getSnippets, deleteSnippet, updateSnippet } from '../services/snippetService';
import Header from './Header';

function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null); // Track snippet being edited
  const [filter, setFilter] = useState({ language: '', tag: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token')); // Initialize isLoggedIn

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const data = await getSnippets();
        const normalizedData = data.map((snippet) => ({
          ...snippet,
          id: Number(snippet.id), // Convert `id` to a number
        }));
        setSnippets(normalizedData);
        setFilteredSnippets(normalizedData);
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      }
    };
    fetchSnippets();
  }, []);

  const handleAddSnippet = (newSnippet) => {
    const normalizedSnippet = { ...newSnippet, id: Number(newSnippet.id) }; // Ensure `id` is a number
    setSnippets([...snippets, normalizedSnippet]);
    setFilteredSnippets([...snippets, normalizedSnippet]);
    setIsAddModalOpen(false); // Corrected: Use `setIsAddModalOpen`
  };

  const handleUpdateSnippet = async (id, updatedSnippet) => {
    try {
      const updatedData = await updateSnippet(id, updatedSnippet);
      const normalizedData = { ...updatedData, id: Number(updatedData.id) }; // Ensure `id` is a number
      const updatedSnippets = snippets.map((snippet) =>
        snippet.id === id ? normalizedData : snippet
      );
      setSnippets(updatedSnippets);
      setFilteredSnippets(updatedSnippets);
    } catch (error) {
      console.error('Failed to update snippet:', error);
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await deleteSnippet(id);
      const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
      setSnippets(updatedSnippets);
      setFilteredSnippets(updatedSnippets);
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });

    const filtered = snippets.filter((snippet) =>
      (filter.language ? snippet.language === value : true) &&
      (filter.tag ? snippet.tags?.includes(value) : true)
    );
    setFilteredSnippets(filtered);
  };

  const handleAddSnippetClick = () => setIsAddModalOpen(true); // Open Add Snippet Modal

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black p-6">
      <Header
        isLoggedIn={isLoggedIn}
        onAddSnippetClick={isLoggedIn ? handleAddSnippetClick : null}
        setIsLoggedIn={setIsLoggedIn ? setIsLoggedIn : null}
      />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-white font-bold">Snippets</h1>
        {isLoggedIn && (
          <button
            onClick={handleAddSnippetClick}
            className="btn btn-primary"
          >
            Add Snippet
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="language"
          placeholder="Filter by Language"
          value={filter.language}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <input
          type="text"
          name="tag"
          placeholder="Filter by Tag"
          value={filter.tag}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
      </div>

      {/* Snippet List */}
      <SnippetList
        snippets={filteredSnippets}
        onEdit={(snippet) => {
          setCurrentSnippet(snippet);
          setIsEditModalOpen(true);
        }}
        onDelete={handleDeleteSnippet}
      />

      {/* Add Snippet Modal */}
      {isAddModalOpen && (
        <AddSnippetModal
          setIsModalOpen={setIsAddModalOpen} // Pass correct state setter
          setSnippets={setSnippets} // Pass correct snippet updater
        />
      )}

      {/* Update Snippet Modal */}
      {isEditModalOpen && currentSnippet && (
        <UpdateSnippetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          snippet={currentSnippet}
          onSave={handleUpdateSnippet}
        />
      )}
    </div>
  );
}

export default SnippetsPage;
