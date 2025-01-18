import { ITracks } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

interface TrackHistoryState{
  tracks:ITracks[] | null,
  tracksLoading:Boolean,
}

const initialState: TrackHistoryState = {
  tracks:null,
  tracksLoading:false,
}

const tracksSlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers:{

  },
  extraReducers: (builder=>{

  }),
  selectors:{

  }
});


export const tracksHistoryReducer = tracksSlice.reducer;
export const {} = tracksSlice.actions;
export  const{} = tracksSlice.selectors

