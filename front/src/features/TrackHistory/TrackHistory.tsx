import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTrackHistoryThunk } from './trackHistoryThunk.ts';
import { selectTracks } from './trackHistorySlice.ts';
import HistoryTrack from './HistoryTrack.tsx';
import { Grid2 } from '@mui/material';
import { selectUser } from '../Users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const tracksHistory = useAppSelector(selectTracks);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const fetchTracksHistory = useCallback(async () => {
    try {
      await dispatch(fetchTrackHistoryThunk());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if(user){
      void fetchTracksHistory();
    }else{
      navigate('/login');
    }
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
