import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchTerm, setResults, setLoading } from '../reducers/SearchSlice';
import ResultsComponent from '../resultsComponent/ResultsComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { useGetPeopleQuery } from '../services/ApiService';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook
import './SearchHero.css'; // Example CSS file for styling

interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

const SearchHero: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const loading = useSelector((state: RootState) => state.search.loading);
  const results = useSelector((state: RootState) => state.search.results);
  const { theme, toggleTheme } = useTheme(); // Use theme context

  const [searchClicked, setSearchClicked] = useState(false);

  const { data: peopleData, isLoading, isError } = useGetPeopleQuery(searchTerm, {
    enabled: searchClicked && searchTerm.trim() !== '',
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      dispatch(setSearchTerm(savedSearchTerm));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    dispatch(setLoading(true));
    setSearchClicked(true);
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setLoading(false));
      if (peopleData?.results) {
        const mappedResults = peopleData.results.map((person: StarWarsPerson) => ({
          name: person.name,
          description: `Height: ${person.height}, Mass: ${person.mass}, Birth year: ${person.birth_year}, Gender: ${person.gender}`,
        }));
        dispatch(setResults(mappedResults));
      }
    }
  }, [isLoading, dispatch, peopleData]);

  return (
    <ErrorBoundary>
      <div className={`search-hero ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', gap: 5 }}>
          <SearchComponent onSearch={handleSearch} />
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <div style={{ padding: '10px' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ResultsComponent results={searchClicked ? results : results} />
          )}
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data.</p>
        ) : null}
      </div>
    </ErrorBoundary>
  );
};

export default SearchHero;
