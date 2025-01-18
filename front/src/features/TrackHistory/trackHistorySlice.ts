import { ITrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrackHistoryThunk } from './trackHistoryThunk.ts';

interface TrackHistoryState {
  tracks: ITrackHistory[] | null;
  tracksLoading: Boolean;
}

const initialState: TrackHistoryState = {
  tracks: null,
  tracksLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistoryThunk.pending, (state) => {
        state.tracksLoading = true;
      })
      .addCase(fetchTrackHistoryThunk.fulfilled, (state, { payload }) => {
        state.tracksLoading = false;
        state.tracks = payload;
      })
      .addCase(fetchTrackHistoryThunk.rejected, (state) => {
        state.tracksLoading = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksLoading: (state) => state.tracksLoading,
  },
});

export const tracksHistoryReducer = tracksSlice.reducer;
export const {} = tracksSlice.actions;
export const { selectTracks, selectTracksLoading } = tracksSlice.selectors;
