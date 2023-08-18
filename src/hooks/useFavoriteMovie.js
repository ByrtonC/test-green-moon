import { useSelector, useDispatch } from 'react-redux';
import { addMovie, removeMovie } from '../store';

export const useFavoriteMovie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.favoriteMovie.movies);
  const addFavoriteMovie = async (movieData) => {
    try {
      dispatch(addMovie(movieData));
    } finally {
      //
    }
  };
  const removeFavoriteMovie = async (movieData) => {
    try {
      dispatch(removeMovie(movieData));
    } finally {
      //
    }
  };

  return { movies, addFavoriteMovie, removeFavoriteMovie };
};
