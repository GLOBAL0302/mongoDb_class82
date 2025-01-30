import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from './globalConstants.ts';
import { RootState } from './app/app.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users?.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    console.log(token);
    return config;
  });
};

export default axiosApi;
