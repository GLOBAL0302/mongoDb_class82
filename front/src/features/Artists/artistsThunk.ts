import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IArtists, IArtistsMutation } from '../../types';

export const fetchArtistsThunk = createAsyncThunk<IArtists[], void>('Artists/fetchArtistsThunk', async () => {
  const { data } = await axiosApi.get('/artists');
  return data;
});


export const addArtistThunk = createAsyncThunk<void, IArtistsMutation>('Artists/addArtistThunk', async (newArtist) => {
  const formData = new FormData();
  const keys = Object.keys(newArtist) as (keyof typeof newArtist)[];
  keys.forEach((key) => {
    if(newArtist[key] !==null){
      formData.append(key, newArtist[key]);
    }
  });
  await axiosApi.post('/artists', formData);
});
