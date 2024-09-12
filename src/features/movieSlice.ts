
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieState {
  currentMovie: Movie | null;
}

const initialState: MovieState = {
  currentMovie: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setCurrentMovie(state, action: PayloadAction<Movie>) {
      state.currentMovie = action.payload;
    },
    clearCurrentMovie(state) {
      state.currentMovie = null;
    },
  },
});

export const { setCurrentMovie, clearCurrentMovie } = movieSlice.actions;

export default movieSlice.reducer;