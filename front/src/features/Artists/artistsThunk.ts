import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IArtists } from '../../types';

export const fetchArtistsThunk = createAsyncThunk<IArtists[], void>('Artists/fetchArtistsThunk', async () => {
  const { data } = await axiosApi.get('/artists');
  return data;
});
