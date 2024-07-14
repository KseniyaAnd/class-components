import { Component } from 'react';

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
}

class ApiService extends Component<ApiServiceProps, {}> {
  componentDidUpdate(prevProps: ApiServiceProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  fetchData = (term: string) => {
    const { onResults, onLoading } = this.props;
    onLoading(true);

    fetch(`https://swapi.dev/api/people/?search=${term}`)
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

  render() {
    return null;
  }
}

export default ApiService;
