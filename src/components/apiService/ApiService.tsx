import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setResults, setLoading } from '../reducers/SearchSlice';

interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

const ApiService: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const dispatch = useDispatch();

  const fetchData = async (term: string | null) => {
    const url = term
      ? `https://swapi.dev/api/people/?search=${term}`
      : 'https://swapi.dev/api/people/';

    try {
      dispatch(setLoading(true));

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const results = data.results.map((item: StarWarsPerson) => ({
        name: item.name,
        description: `Height: ${item.height}, Mass: ${item.mass}, Birth year: ${item.birth_year}, Gender: ${item.gender}`,
      }));

      dispatch(setResults(results));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData(searchTerm); // Always fetch data based on the current searchTerm
  }, [searchTerm, dispatch]);

  // No need to return anything from this component
  return null;
};

export default ApiService;
