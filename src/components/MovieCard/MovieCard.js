import { useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Link, Card, Grid, Typography, CardContent, Dialog, DialogTitle } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
// utils
import { Player } from 'video-react';
import { fDate } from '../../utils/formatTime';
//
import SvgColor from '../svg-color';

import { useFavoriteMovie } from '../../hooks/useFavoriteMovie';

import 'video-react/dist/video-react.css';

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function MovieCard(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const { movies, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovie();
  const isFavorite = movies.some((e) => e.id === props.id);
  const {
    title_en: title,
    poster_url: poster,
    date_update: createdAt,
    synopsis_en: description,
    tr_mp4: tr,
    rating,
  } = props;
  const latestPostLarge = false;
  const latestPost = false;

  const onClickFavorite = () => {
    if (isFavorite) {
      removeFavoriteMovie(props);
      return;
    }
    addFavoriteMovie(props);
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Grid container sx={{ px: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{`Rating : ${rating}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img alt={title} src={poster} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6">Trailer</Typography>
            <Player>
              <source src={tr} />
            </Player>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{description}</Typography>
          </Grid>
        </Grid>
        {/*  */}
      </Dialog>

      {/* Main */}
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <StyledCover alt={title} src={poster} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <Grid container justifyContent={'space-between'}>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              sx={{
                ...(latestPostLarge && { typography: 'h5', height: 60 }),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
                cursor: 'pointer',
              }}
              onClick={() => setOpenDialog(true)}
            >
              {title}
            </StyledTitle>
            <FavoriteRoundedIcon
              onClick={onClickFavorite}
              sx={{ cursor: 'pointer' }}
              color={isFavorite ? 'primary' : undefined}
            />
          </Grid>
          <StyledTitle
            color="inherit"
            variant="body"
            underline="none"
            sx={{
              ...(latestPostLarge && { typography: 'body2', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
              }),
            }}
          >
            {description}
          </StyledTitle>
        </CardContent>
      </Card>
    </Grid>
  );
}
