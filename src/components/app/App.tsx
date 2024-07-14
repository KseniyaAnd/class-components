import React, { useState } from 'react';
import ApiService from './ApiService';
import ResultsComponent from './ResultsComponent';
import SearchComponent from './SearchComponent';
import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => {
    const [results, setResults] = useState<Array<{ name: string; description: string }>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleResults = (results: Array<{ name: string; description: string }>) => {
        setResults(results);
    };

    const handleLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    return (
      <ErrorBoundary>
          <div>
              <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <SearchComponent onSearch={handleSearch} />
              </div>
              <div style={{ padding: '10px' }}>
                  {loading ? <p>Loading...</p> : <ResultsComponent results={results} />}
              </div>
              <ApiService searchTerm={searchTerm} onResults={handleResults} onLoading={handleLoading} />
          </div>
      </ErrorBoundary>
    );
};

export default App;
