import React from 'react';
import PropTypes from 'prop-types';

function EntryCard({ entry, onClick }) {
  const fallbackImage = "https://picsum.photos/200/300";

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={entry.image || fallbackImage} // Use the provided image or fallback
        alt={entry.title}
        onError={(e) => {
          e.target.src = fallbackImage; // Fallback if the provided image URL is invalid
        }}
        className="rounded-lg w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold text-gray-800">{entry.title}</h2>
      <p className="text-gray-600">{entry.content.substring(0, 100)}...</p>
    </div>
  );
}

EntryCard.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string, // Optional image field
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EntryCard;
