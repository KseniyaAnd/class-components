import React, { useState } from 'react';
import ApiService from '../apiService/ApiService';
import ResultsComponent from '../resultsComponent/ResultsComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SearchHero: React.FC = () => {
  const [results, setResults] = useState<Array<{ name: string; description: string }>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <div>
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <SearchComponent onSearch={setSearchTerm} />
        </div>
        <div style={{ padding: '10px' }}>
          {loading ? <p>Loading...</p> : <ResultsComponent results={results} />}
        </div>
        <ApiService searchTerm={searchTerm} onResults={setResults} onLoading={setLoading} />
      </div>
    </ErrorBoundary>
  );
};

export default SearchHero;
