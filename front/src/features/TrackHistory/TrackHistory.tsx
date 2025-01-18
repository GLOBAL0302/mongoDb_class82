import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTrackHistoryThunk } from './trackHistoryThunk.ts';
import { selectTracks } from './trackHistorySlice.ts';
import HistoryTrack from './HistoryTrack.tsx';
import { Grid2 } from '@mui/material';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const tracksHistory = useAppSelector(selectTracks);

  const fetchTracksHistory = useCallback(async () => {
    try {
      await dispatch(fetchTrackHistoryThunk());
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(tracksHistory);
  useEffect(() => {
    void fetchTracksHistory();
  }, [fetchTracksHistory]);

  return (
    tracksHistory && (
      <Grid2 container direction="column" spacing={2}>
        {tracksHistory.map((history) => (
          <HistoryTrack key={history._id} history={history} />
        ))}
      </Grid2>
    )
  );
};

export default TrackHistory;
