import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IAlbums } from '../../types';

export const fetchAlbumsThunk = createAsyncThunk<IAlbums[], string>('albums/fetchAlbums', async (artistId) => {
  const { data } = await axiosApi.get(`albums?artist=${artistId}`);
  return data;
});
