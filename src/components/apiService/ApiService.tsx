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
    const fetchData = async (term: string) => {
      onLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${term}`);
        const data = await response.json();
        const results = data.results.map((item: StarWarsPerson) => ({
          name: item.name,
          description: `Height: ${item.height}, Mass: ${item.mass}, Birth year: ${item.birth_year}, Gender: ${item.gender}`,
        }));
        onResults(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        onLoading(false);
      }
    };

    if (searchTerm) {
      fetchData(searchTerm);
    }
  }, [searchTerm, onResults, onLoading]);

  return null;
};

export default ApiService;
