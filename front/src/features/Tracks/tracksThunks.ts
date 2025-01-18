import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrackHistory, ITracks } from '../../types';
import { RootState } from '../../app/app.ts';

export const fetchTracks = createAsyncThunk<ITrackHistory[], string>('tracks/fetchTracks', async (AlbumId) => {
  const { data } = await axiosApi.get(`tracks?albumId=${AlbumId}`);
  return data;
});

export const addTrack = createAsyncThunk<void, ITracks, { state: RootState }>(
  'tracks/addTrack',
  async (track, { getState }) => {
    const token = getState().users.user?.token;
    const data = { ...track };
    await axiosApi.post(`track_history`, data, { headers: { Authorization: token } });
  },
);
