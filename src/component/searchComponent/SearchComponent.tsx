import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

interface SearchComponentProps {
    onSearch: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState<string>(() => {
        const savedSearchTerm =  Cookies.get('searchTerm');
        return savedSearchTerm ?? '';
    });

    const handleSearch = () => {
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm !== '') {
            onSearch(trimmedTerm);
        } else {
            onSearch('');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input
                type="text"
                style={{padding: '0.6em 0.5em'}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchComponent;
