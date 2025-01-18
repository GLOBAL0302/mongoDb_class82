import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ILoginMutation, IRegisterResponse, IValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const signUpUserThunk = createAsyncThunk<
  IRegisterResponse,
  ILoginMutation,
  {rejectValue:IValidationError}>(
  "users/signUpUsersThunk",
  async (registerMutation:ILoginMutation, {rejectWithValue})=>{
    try{
      const response =  await axiosApi.post<IRegisterResponse>("/users/register", registerMutation);
      return response.data;
    }catch(error){
      if(isAxiosError(error) && error.response && error.response.status === 400){
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
)