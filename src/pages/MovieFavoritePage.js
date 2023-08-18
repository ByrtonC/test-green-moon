import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import MovieCard from '../components/MovieCard/MovieCard';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

import { useGetMovie } from '../hooks/useGetMovie';
import { useFavoriteMovie } from '../hooks/useFavoriteMovie';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function MovieFavoritePage() {
  // const { movies } = useGetMovie();
  const { movies } = useFavoriteMovie();
  return (
    <>
      <Helmet>
        <title> Movie Favorite </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Movie Favorite
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {movies.map((item, index) => (
            <MovieCard key={`${item.id}-${index}`} {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
