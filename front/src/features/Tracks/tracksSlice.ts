import { ITracks } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTracks } from './tracksThunks.ts';

interface TracksState {
  tracks: ITracks[];
  trackAlbum: string | null;
  author: string | null;
  fetchingTracks: boolean;
}

const initialState: TracksState = {
  tracks: [],
  trackAlbum: null,
  author: null,
  fetchingTracks: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchingTracks = false;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload }) => {
        state.fetchingTracks = true;
        state.tracks = payload;
        state.trackAlbum = payload[0].album.title;
        state.author = payload[0].album.artist.title;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchingTracks = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTrackAlbum: (state) => state.trackAlbum,
    selectTrackAlbumAuthor: (state) => state.author,
    selectFetchTracks: (state) => state.fetchingTracks,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { selectTracks, selectTrackAlbum, selectTrackAlbumAuthor, selectFetchTracks } = tracksSlice.selectors;
