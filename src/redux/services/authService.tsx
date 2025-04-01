import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_USER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_USER,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    nivaastriggerotp: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.OTP_TRIGGER,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    nivaasSignin: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.SIGN_IN,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    userDetails: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.USER_DETAILS,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useNivaastriggerotpMutation,
  useNivaasSigninMutation,
  useUserDetailsMutation,
} = authService;