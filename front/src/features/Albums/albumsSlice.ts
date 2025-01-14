import { IAlbums } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbumsThunk } from './albumsThunk.ts';

interface AlbumsState {
  Albums: IAlbums[];
  AlbumAuthor: string | null;
  fetchingAlbums: boolean;
}

const initialState: AlbumsState = {
  Albums: [],
  AlbumAuthor: null,
  fetchingAlbums: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsThunk.pending, (state) => {
        state.fetchingAlbums = false;
      })
      .addCase(fetchAlbumsThunk.fulfilled, (state, { payload }) => {
        state.fetchingAlbums = true;
        state.Albums = payload;
        state.AlbumAuthor = payload[0].artist.title;
      })
      .addCase(fetchAlbumsThunk.rejected, (state) => {
        state.fetchingAlbums = false;
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
