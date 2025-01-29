import { IArtists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addArtistThunk, fetchArtistsThunk } from './artistsThunk.ts';

interface artistsState {
  allArtists: IArtists[];
  fetchingArtists: boolean;
  addArtistLoading: boolean;
}

const initialState: artistsState = {
  allArtists: [],
  fetchingArtists: false,
  addArtistLoading: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsThunk.pending, (state) => {
        state.fetchingArtists = true;
      })
      .addCase(fetchArtistsThunk.fulfilled, (state, { payload }) => {
        state.fetchingArtists = false;
        state.allArtists = payload;
      })
      .addCase(fetchArtistsThunk.rejected, (state) => {
        state.fetchingArtists = false;
      });

    builder
      .addCase(addArtistThunk.pending, (state) => {
        state.addArtistLoading = true;
      })
      .addCase(addArtistThunk.fulfilled, (state) => {
        state.addArtistLoading = false;
      })
      .addCase(addArtistThunk.rejected, (state) => {
        state.addArtistLoading = false;
      });
  },
  selectors: {
    selectAllArtists: (state) => state.allArtists,
    selectFetchingArtists: (state) => state.fetchingArtists,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const { selectAllArtists, selectFetchingArtists } = artistsSlice.selectors;
