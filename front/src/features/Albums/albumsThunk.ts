import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IAlbums, IAlbumsMutation } from '../../types';

export const fetchAlbumsThunk = createAsyncThunk<IAlbums[], string>('albums/fetchAlbums', async (artistId) => {
  const { data } = await axiosApi.get(`albums?artist=${artistId}`);
  return data;
});

export const addAlbum = createAsyncThunk<void, {newAlbum:IAlbumsMutation, artistId:string}>(
  'albums/addAlbum',
  async({newAlbum, artistId})=>{
    console.log({newAlbum, artistId});

    const formData = new FormData();
    const keys = Object.keys(newAlbum) as (keyof IAlbumsMutation)[]
    keys.forEach((key) => {
      if(newAlbum[key] !== null) {
        formData.append(key, newAlbum[key]);
      }
    });

    formData.append("artist", artistId);
    await axiosApi.post("/albums", formData);
  }
)
