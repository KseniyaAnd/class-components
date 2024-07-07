import React, {Component, ChangeEvent} from 'react';

interface SearchComponentProps {
    onSearch: (term: string) => void;
}

interface SearchComponentState {
    searchTerm: string;
}

class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {
    constructor(props: SearchComponentProps) {
        super(props);
        const savedTerm = localStorage.getItem('searchTerm') || '';
        this.state = {
            searchTerm: savedTerm,
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({searchTerm: event.target.value});
    };

    handleSearch = () => {
        const {searchTerm} = this.state;
        const trimmedTerm = searchTerm.trim();
        this.props.onSearch(trimmedTerm);
        localStorage.setItem('searchTerm', trimmedTerm);
    };

    render() {
        return (
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <input
                    type="text"
                    style={{padding: "0.6em 0.5em"}}
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchComponent;
