import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  results: Array<{ name: string; description: string }>;
  loading: boolean;
  selectedItems: Array<string>;
}

const initialState: SearchState = {
  searchTerm: '',
  results: [],
  loading: false,
  selectedItems: JSON.parse(localStorage.getItem('selectedItems') || '[]'), // Load from local storage
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
    selectItem(state, action: PayloadAction<string>) {
      state.selectedItems.push(action.payload);
      localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems)); // Save to local storage
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(item => item !== action.payload);
      localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems)); // Save to local storage
    },
  },
});

export const { setSearchTerm, setResults, setLoading, selectItem, unselectItem } = searchSlice.actions;
export default searchSlice.reducer;
