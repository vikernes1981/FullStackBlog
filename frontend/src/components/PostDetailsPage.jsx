// src/components/PostDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/postService'; // Import service
import { useParams, Link } from 'react-router-dom';
import UpdateEntryModal from './UpdateEntryModal'; // Import the modal component

const PostDetailsPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id); // Fetch post details
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post:', error);
                setError('Failed to fetch post');
            }
        };

        if (id) {
            fetchPost(); // Call the fetch function
        } else {
            setError('Invalid post ID');
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            await deletePost(id); // Delete post
            window.location.href = '/'; // Redirect to home
        } catch (error) {
            console.error('Failed to delete post:', error);
            setError('Failed to delete post');
        }
    };

    const handleUpdate = (updatedPost) => {
        setPost(updatedPost); // Update the post state with the updated post
    };

    if (error) return <div className="alert alert-error">{error}</div>;
    if (!post) return <div className="loading loading-spinner loading-lg"></div>;

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-red-400 to-gray-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <figure className="flex justify-center mb-6">
                    <img src={post.image} alt={post.title} className="h-40 w-40 object-cover border-b border-gray-300" />
                </figure>
                <div className="card-body p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{post.title}</h1>
                    <div className="prose lg:prose-xl text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
                <div className="text-center mt-4 flex flex-wrap justify-center gap-2">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-800"
                            >
                                Update Post
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800"
                            >
                                Delete Post
                            </button>
                        </>
                    ) : null}
                    <Link to="/" className="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-800">
                        Back to Posts
                    </Link>
                </div>
            </div>
            <UpdateEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdate}
                entry={post}
            />
        </div>
    );
};

export default PostDetailsPage;
