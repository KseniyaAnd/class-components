import { useEffect } from 'react';

interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

interface ApiServiceProps {
  searchTerm: string;
  onResults: (results: Array<{ name: string; description: string }>) => void;
  onLoading: (isLoading: boolean) => void;
}

const ApiService: React.FC<ApiServiceProps> = ({ searchTerm, onResults, onLoading }) => {
  useEffect(() => {
    const fetchData = (term: string) => {
      onLoading(true);
      const url = term
        ? `https://swapi.dev/api/people/?search=${term}`
        : `https://swapi.dev/api/people/`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.results.map((item: StarWarsPerson) => ({
            name: item.name,
            description: `Height: ${item.height}, Mass: ${item.mass}, Birth year: ${item.birth_year}, Gender: ${item.gender}`,
          }));
          onResults(results);
          onLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          onLoading(false);
        });
    };

    fetchData(searchTerm);
  }, [searchTerm, onResults, onLoading]);

  return null;
};

export default ApiService;
