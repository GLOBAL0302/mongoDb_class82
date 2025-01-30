import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchTracks } from './tracksThunks.ts';
import { selectFetchTracks, selectTrackAlbum, selectTrackAlbumAuthor, selectTracks } from './tracksSlice.ts';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import Track from './Track.tsx';

const Tracks = () => {
  const { id } = useParams();
  const author = useAppSelector(selectTrackAlbumAuthor);
  const trackAlbum = useAppSelector(selectTrackAlbum);
  const selectAllTracks = useAppSelector(selectTracks);
  const tracksLoading = useAppSelector(selectFetchTracks);
  const dispatch = useAppDispatch();

  const fetchAllTracks = useCallback(async () => {

    console.log(id);
    if (id){
      await dispatch(fetchTracks(id));
    }
  }, []);

  useEffect(() => {
    void fetchAllTracks();
  }, [fetchAllTracks]);

  return (
    <Grid2>
      <Typography textAlign="center" variant="h2" component="h2">
        {author}
      </Typography>
      <Typography textAlign="center" variant="h4" component="h4">
        {trackAlbum}
      </Typography>
      {tracksLoading ? (
        <CircularProgress />
      ) : (
        <Grid2 container direction="column" spacing={2}>
          {selectAllTracks.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </Grid2>
      )}
    </Grid2>
  );
};

export default Tracks;
