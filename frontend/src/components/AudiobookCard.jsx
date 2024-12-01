import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AudiobookCard({ audiobook }) {
  const fallbackImage = "https://picsum.photos/200/300"; // Placeholder image

  return (
    <Link to={`/audiobooks/${audiobook.id}`}>
      <div className="bg-gradient-to-b from-gray-400 to-[#D3EEDD] shadow-lg rounded-lg p-4 cursor-pointer">
        <img
          src={audiobook.image || fallbackImage}
          alt={audiobook.title}
          onError={(e) => {
            e.target.src = fallbackImage; // Fallback if the provided image URL is invalid
          }}
          className="rounded-lg w-full h-48 object-cover"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800">{audiobook.title}</h2>
          <p className="text-sm text-gray-600">
            <strong>Author:</strong> {audiobook.author}
          </p>
        </div>
        <p className="text-gray-600 mt-2">
          {audiobook.description.length > 100
            ? audiobook.description.substring(0, 100) + '...'
            : audiobook.description}
        </p>
      </div>
    </Link>
  );
}

AudiobookCard.propTypes = {
  audiobook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default AudiobookCard;
