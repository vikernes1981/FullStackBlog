import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import EntryCard from './EntryCard';

function EntryList({ entries, onEntryClick }) {
  const navigate = useNavigate();

  // Save entries to localStorage
  React.useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  // Log entries to console
  console.log('Entries:', entries);

  const handleEntryClick = (entry) => {
    onEntryClick(entry);
    navigate(`/entries/${entry.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <EntryCard key={entry.date} entry={entry} onClick={() => handleEntryClick(entry)} />
      ))}
    </div>
  );
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
  onEntryClick: PropTypes.func.isRequired,
};

export default EntryList;
