import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/app.ts';
import axiosApi from '../../axiosApi.ts';
import { ITrackHistory } from '../../types';

export const fetchTrackHistoryThunk = createAsyncThunk<ITrackHistory[], void, { state: RootState }>(
  'trackHistoryThunk',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    const { data } = await axiosApi.get('track_history', { headers: { Authorization: token } });
    return data;
  },
);
