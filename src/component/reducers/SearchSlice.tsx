import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface SearchState {
    searchTerm: string;
    results: Array<{ name: string; description: string }>;
    loading: boolean;
    selectedItems: Array<{ name: string; description: string }>;
}

const initialState: SearchState = {
    searchTerm: '',
    results: [],
    loading: false,
    selectedItems: JSON.parse(Cookies.get('selectedItems') || '[]'),
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setResults(state, action: PayloadAction<Array<{ name: string; description: string }>>) {
            state.results = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        selectItem(state, action: PayloadAction<{ name: string; description: string }>) {
            state.selectedItems.push(action.payload);
            Cookies.set('selectedItems', JSON.stringify(state.selectedItems));
        },
        unselectItem(state, action: PayloadAction<string>) {
            state.selectedItems = state.selectedItems.filter(item => item.name !== action.payload);
            Cookies.set('selectedItems', JSON.stringify(state.selectedItems));
        },
        unselectAll(state) {
            state.selectedItems = [];
            Cookies.remove('selectedItems');
        },
    },
});

export const {setSearchTerm, setResults, setLoading, selectItem, unselectItem, unselectAll} = searchSlice.actions;
export default searchSlice.reducer;
