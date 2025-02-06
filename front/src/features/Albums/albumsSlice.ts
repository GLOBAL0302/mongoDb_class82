import { IAlbums } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addAlbum, fetchAlbumsThunk } from './albumsThunk.ts';

interface AlbumsState {
  Albums: IAlbums[];
  AlbumAuthor: string | null;
  fetchingAlbums: boolean;
  addingAlbum: boolean;
}

const initialState: AlbumsState = {
  Albums: [],
  AlbumAuthor: null,
  fetchingAlbums: false,
  addingAlbum: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsThunk.pending, (state) => {
        state.fetchingAlbums = true;
      })
      .addCase(fetchAlbumsThunk.fulfilled, (state, { payload }) => {
        state.fetchingAlbums = false;
        state.Albums = payload;
        state.AlbumAuthor = payload[0].artist.title;
      })
      .addCase(fetchAlbumsThunk.rejected, (state) => {
        state.fetchingAlbums = false;
      });

    builder
      .addCase(addAlbum.pending, (state) => {
        state.addingAlbum = true;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.addingAlbum = false;
      })
      .addCase(addAlbum.rejected, (state) => {
        state.addingAlbum = false;
      });
  },
  selectors: {
    selectAllAlbums: (state) => state.Albums,
    selectAuthor: (state) => state.AlbumAuthor,
    selectFetchingAlbums: (state) => state.fetchingAlbums,
  },
});

export const albumsReducer = albumsSlice.reducer;
export const { selectAllAlbums, selectAuthor, selectFetchingAlbums } = albumsSlice.selectors;
