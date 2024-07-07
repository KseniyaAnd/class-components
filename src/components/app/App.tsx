import {Component} from 'react';
import ApiService from '../apiService/ApiService.tsx';
import ResultsComponent from "../resultsComponent/ResultsComponent.tsx";
import SearchComponent from "../searchComponent/SearchComponent.tsx";
import ErrorBoundary from "../errorBoundary/ErrorBoundary.tsx";

interface AppState {
    results: Array<{ name: string; description: string }>;
    searchTerm: string,
    loading: boolean;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            results: [],
            searchTerm: '',
            loading: false,
        };
    }

    handleSearch = (term: string) => {
        this.setState({searchTerm: term});
    };

    handleResults = (results: Array<{ name: string; description: string }>) => {
        this.setState({results});
    };

    handleLoading = (isLoading: boolean) => {
        this.setState({loading: isLoading});
    };

    render() {
        const {results, searchTerm, loading} = this.state;

        return (
            <ErrorBoundary>
                <div>
                    <div style={{padding: '10px', borderBottom: '1px solid #ddd'}}>
                        <SearchComponent onSearch={this.handleSearch}/>
                    </div>
                    <div style={{padding: '10px'}}>
                        {loading ? <p>Loading...</p> : <ResultsComponent results={results}/>}
                    </div>
                    <ApiService
                        searchTerm={searchTerm}
                        onResults={this.handleResults}
                        onLoading={this.handleLoading}
                    />
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
