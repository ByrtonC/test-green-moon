import { configureStore, createSlice } from '@reduxjs/toolkit';

export const defaultData = window.localStorage.getItem('userData');
const initialStateAuth = !!defaultData ? JSON.parse(defaultData) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setAuth: (state, { payload }) => {
      state = {};
      state.email = payload;
      state.name = 'Jaydon Frankie';
      window.localStorage.setItem('userData', JSON.stringify(state));
    },
    clearAuth: (state) => {
      window.localStorage.removeItem('userData');
      state = null;
    },
  },
});

export const defaultDataFavorite = window.localStorage.getItem('favoriteMovie');

const initialStateFavorite = !!defaultDataFavorite ? JSON.parse(defaultDataFavorite) : [];

export const sliceFavoriteMovie = createSlice({
  name: 'favoriteMovie',
  initialState: { movies: initialStateFavorite },
  reducers: {
    addMovie: (state, { payload }) => {
      state.movies = [...state.movies, payload];
      window.localStorage.setItem('favoriteMovie', JSON.stringify(state.movies));
    },
    removeMovie: (state, { payload }) => {
      state.movies = state.movies.filter((e) => e.id !== payload.id);
      window.localStorage.setItem('favoriteMovie', JSON.stringify(state.movies));
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    favoriteMovie: sliceFavoriteMovie.reducer,
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const { addMovie, removeMovie } = sliceFavoriteMovie.actions;

export default store;
