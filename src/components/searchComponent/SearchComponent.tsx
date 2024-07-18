import React, { useState, useEffect } from 'react';

interface SearchComponentProps {
  onSearch: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    return savedSearchTerm ?? ''; // Default to empty string if no searchTerm is found
  });

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm !== '') {
      onSearch(trimmedTerm);
    } else {
      onSearch(''); // Trigger search with a default term if searchTerm is empty
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        type="text"
        style={{ padding: '0.6em 0.5em' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
