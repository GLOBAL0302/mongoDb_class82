import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITracks } from '../../types';

export const fetchTracks = createAsyncThunk<ITracks[], string>('tracks/fetchTracks', async (AlbumId) => {
  const { data } = await axiosApi.get(`tracks?albumId=${AlbumId}`);
  return data;
});
