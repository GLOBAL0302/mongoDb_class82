import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllAlbums, selectAuthor, selectFetchingAlbums } from './albumsSlice.ts';
import { useCallback, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid2, Typography } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { fetchAlbumsThunk } from './albumsThunk.ts';
import Album from './Album.tsx';
import { selectUser } from '../Users/usersSlice.ts';

const Albums = () => {
  const { id } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const allAlbums = useAppSelector(selectAllAlbums);
  const albumsLoading = useAppSelector(selectFetchingAlbums);
  const author = useAppSelector(selectAuthor);

  const fetchAllAlbums = useCallback(async () => {
    if (id) await dispatch(fetchAlbumsThunk(id));
  }, []);

  useEffect(() => {
    void fetchAllAlbums();
  }, [fetchAllAlbums]);

  return (
    <Box component="div">
      <Grid2 container justifyContent="space-between">
        <Grid2>
          <Typography textAlign="center" variant="h4" component="h4">
            {author?.toUpperCase()}
          </Typography>
        </Grid2>
        <Grid2>
          {user && (
            <Button component={NavLink} to={`/addAlbum`} variant="outlined" color="primary">
              Add album
            </Button>
          )}
        </Grid2>
      </Grid2>
      {albumsLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid2 container flexDirection="column" spacing={2}>
            {allAlbums.map((album) => (
              <Album key={album._id} album={album} />
            ))}
          </Grid2>
        </>
      )}
    </Box>
  );
};

export default Albums;
