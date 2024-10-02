// src/components/PostDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { getPostById, deletePost } from '../services/postService'; // Import service
import { useParams, Link } from 'react-router-dom';

const PostDetailsPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(id); // Fetch post details
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await deletePost(id); // Delete post
        window.location.href = '/'; // Redirect to home
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.cover} alt={post.title} />
            <p>{post.content}</p>
            <Link to={`/update/${post.id}`}>Update Post</Link>
            <button onClick={handleDelete}>Delete Post</button>
            <Link to="/">Back to Posts</Link>
        </div>
    );
};

export default PostDetailsPage;
