import axios from 'axios';
import { useState, useEffect } from 'react';

export const useGetMovie = () => {
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    try {
      const {
        data: { movies: data },
      } = await axios.get('https://www.majorcineplex.com/apis/get_movie_avaiable');
      setMovies(data);
      return data;
    } finally {
      //
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  return { movies };
};
