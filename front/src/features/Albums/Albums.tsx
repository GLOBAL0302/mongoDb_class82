import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAllAlbums, selectAuthor, selectFetchingAlbums } from './albumsSlice.ts';
import { useCallback, useEffect } from 'react';
import { Box, CircularProgress, Grid2, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchAlbumsThunk } from './albumsThunk.ts';
import Album from './Album.tsx';

const Albums = () => {
  const { id } = useParams();
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
      <Typography textAlign="center" variant="h4" component="h4">
        {author?.toUpperCase()}
      </Typography>
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
