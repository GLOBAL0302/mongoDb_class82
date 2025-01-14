import { IAlbums } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumsState {
  allAlbums:IAlbums[],
  fetchingAlbums:boolean
}

const initialState: AlbumsState = {
  allAlbums:[],
  fetchingAlbums:false
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers:{

  },
  extraReducers:(builder =>{

  }),
  selectors:{

  }
});

export const albumsReducer = albumsSlice.reducer;
export const {} = albumsSlice.selectors;