import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  results: Array<{ name: string; description: string }>;
  loading: boolean;
}

const initialState: SearchState = {
  searchTerm: '',
  results: [],
  loading: false,
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
  },
});

export const { setSearchTerm, setResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
