import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { selectAllArtists, selectFetchingArtists } from './artistsSlice.ts';
import { fetchArtistsThunk } from './artistsThunk.ts';
import { Button, CircularProgress, Grid2, Typography } from '@mui/material';
import Artist from './Artist';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../Users/usersSlice.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectAllArtists);
  const artistsLoading = useAppSelector(selectFetchingArtists);
  const user = useAppSelector(selectUser);

  const fetchAllArtists = useCallback(async () => {
    await dispatch(fetchArtistsThunk());
  }, []);

  useEffect(() => {
    void fetchAllArtists();
  }, [fetchAllArtists]);

  return (
    <>
      <>
        <Grid2 container alignItems="center" justifyContent="space-between">
          <Grid2>
            <Typography textAlign="center" variant="h2" component="h2">
              Albums
            </Typography>
          </Grid2>
          {user && (
            <Grid2>
              <Button component={NavLink} to="/addArtist" variant="outlined">
                Add Artist
              </Button>
            </Grid2>
          )}
        </Grid2>
        <Grid2 container spacing={2}>
          {artistsLoading ? (
            <CircularProgress />
          ) : (
            <>
              {artists.map((artist) => (
                <Grid2 key={artist._id}>
                  <Artist artist={artist} />
                </Grid2>
              ))}
            </>
          )}
        </Grid2>
      </>
    </>
  );
};

export default Artists;
