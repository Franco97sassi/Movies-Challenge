import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface SearchState {
  searchResults: Movie[];
}

const initialState: SearchState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<Movie[]>) {
      state.searchResults = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;