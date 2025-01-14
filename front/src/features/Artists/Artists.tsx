import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { selectAllArtists } from './artistsSlice.ts';
import { fetchArtistsThunk } from './artistsThunk.ts';
import { Grid2, Typography } from '@mui/material';
import Artist from './Artist';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectAllArtists);

  const fetchAllArtists = useCallback(async () => {
    await dispatch(fetchArtistsThunk());
  }, []);

  useEffect(() => {
    void fetchAllArtists();
  }, []);

  return (
    <>
      <Typography textAlign="center" variant="h2" component="h2">
        Albums
      </Typography>
      <Grid2 container spacing={2}>
        {artists.map((artist) => (
          <Grid2 key={artist._id}>
            <Artist artist={artist} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Artists;
