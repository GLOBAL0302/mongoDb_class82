import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IAlbums, IAlbumsMutation } from '../../types';

export const fetchAlbumsThunk = createAsyncThunk<IAlbums[], string>('albums/fetchAlbums', async (artistId) => {
  const { data } = await axiosApi.get(`albums?artist=${artistId}`);
  return data;
});

export const addAlbum = createAsyncThunk<void, IAlbumsMutation>(
  'albums/addAlbum',
  async(newAlbum)=>{

    const formData = new FormData();
    const keys = Object.keys(newAlbum) as (keyof IAlbumsMutation)[]
    keys.forEach((key) => {
      if(newAlbum[key] !== null) {
        formData.append(key, newAlbum[key]);
      }
    });
    await axiosApi.post("/albums", formData);
  }
)
