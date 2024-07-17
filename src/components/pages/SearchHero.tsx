import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchTerm, setResults, setLoading } from '../reducers/SearchSlice';
import ResultsComponent from '../resultsComponent/ResultsComponent';
import SearchComponent from '../searchComponent/SearchComponent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { useGetPeopleQuery } from '../services/ApiService'; // Import the hook

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

  const [searchClicked, setSearchClicked] = useState(false); // State to track if search button is clicked

  // Fetch data using useGetPeopleQuery hook
  const { data: peopleData, isLoading, isError } = useGetPeopleQuery(searchTerm, {
    enabled: searchClicked && searchTerm.trim() !== '', // Fetch data only when searchClicked is true and searchTerm is not empty
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
    dispatch(setLoading(true)); // Start loading indicator
    setSearchClicked(true); // Set searchClicked to true on search button click
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setLoading(false)); // Turn off loading indicator when data fetching is complete
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
      <div>
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          <SearchComponent onSearch={handleSearch} />
        </div>
        <div style={{ padding: '10px' }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ResultsComponent results={searchClicked ? results : results} />
          )}
        </div>
      </div>
      {/* Render fetched data */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data.</p>
      ) : null}
    </ErrorBoundary>
  );
};

export default SearchHero;
