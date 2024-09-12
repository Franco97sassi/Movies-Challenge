import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movieSlice';
import searchReducer from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;