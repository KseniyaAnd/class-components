import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchTerm } from '../reducers/SearchSlice';
import ResultsComponent from '../resultsComponent/ResultsComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ApiService from '../apiService/ApiService';

const SearchHero: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const loading = useSelector((state: RootState) => state.search.loading);
  const results = useSelector((state: RootState) => state.search.results);

  // Load search term from local storage on component mount
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      dispatch(setSearchTerm(savedSearchTerm));
    }
  }, [dispatch]);

  // Save search term to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
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
      </div>
      <ApiService searchTerm={searchTerm} />
    </ErrorBoundary>
  );
};

export default SearchHero;
