import { IArtists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtistsThunk } from './artistsThunk.ts';

interface artistsState {
  allArtists:IArtists[],
  fetchingArtists: boolean,
}

const initialState:artistsState = {
  allArtists:[],
  fetchingArtists:false
}

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers:(builder=>{
    builder
      .addCase(fetchArtistsThunk.pending, (state)=>{
        state.fetchingArtists = true;
      })
      .addCase(fetchArtistsThunk.fulfilled, (state, {payload})=>{
        state.fetchingArtists = false;
        state.allArtists = payload;
      })
      .addCase(fetchArtistsThunk.rejected, (state)=>{
        state.fetchingArtists = false;
      })
  }),
  selectors:{
    selectAllArtists:(state => state.allArtists),
  }
});

export const artistsReducer = artistsSlice.reducer;
export const {selectAllArtists} = artistsSlice.selectors;