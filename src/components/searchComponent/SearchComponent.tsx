import React, { ChangeEvent } from 'react';
import useLocalStorage from './useLocalStorage';

interface SearchComponentProps {
    onSearch: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const trimmedTerm = searchTerm.trim();
        onSearch(trimmedTerm);
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            style={{ padding: '0.6em 0.5em' }}
            value={searchTerm}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
      </div>
    );
};

export default SearchComponent;
