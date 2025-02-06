import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IGlobalError, ILoginMutation, IRegisterResponse, IUser, IValidationError } from '../../types';
import { isAxiosError } from 'axios';


export const googleLogin =  createAsyncThunk<IUser, string, {rejectValue:IGlobalError}>(
  "user/googleLogin",
  async(credential, {rejectWithValue})=>{
    try{
      const response = await axiosApi.post("/users/google", {credential});
      return response.data.user;

    }catch (error){
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error
    }
  }
)

export const signUpUserThunk = createAsyncThunk<IRegisterResponse, ILoginMutation, { rejectValue: IValidationError }>(
  'users/signUpUsersThunk',
  async (registerMutation: ILoginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IRegisterResponse>('/users/register', registerMutation);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const signInThunk = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'users/signInThunk',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IRegisterResponse>('users/sessions', loginMutation);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as IGlobalError);
      }
      throw error;
    }
  },
);

export const logOutThunk = createAsyncThunk(
  'users/logOutThunk',
  async () => {
    await axiosApi.delete('/users/sessions');
  },
);
