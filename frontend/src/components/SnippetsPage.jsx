import { useState, useEffect } from 'react';
import Header from './Header'; // Reuse your existing header
import SnippetList from './SnippetList'; // New component for listing snippets
import AddSnippetModal from './AddSnippetModal'; // New component for adding snippets
import { getSnippets } from '../services/snippetService'; // Fetch snippets from backend

function SnippetsPage({ setIsLoggedIn }) {
    const [snippets, setSnippets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setLocalIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('token');
    });

    // Fetch snippets from the backend when the component mounts
    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const data = await getSnippets();
                setSnippets(data);
            } catch (error) {
                console.error('Failed to fetch snippets:', error);
            }
        };

        fetchSnippets();
    }, []);

    return (
        <div>
            <Header setIsLoggedIn={setIsLoggedIn} />
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold">My Snippets</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Snippet
                    </button>
                </div>
                <SnippetList snippets={snippets} />
            </div>
            {isModalOpen && (
                <AddSnippetModal
                    setIsModalOpen={setIsModalOpen}
                    setSnippets={setSnippets}
                />
            )}
        </div>
    );
}

export default SnippetsPage;
