import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const notificationService = createApi({
  reducerPath: 'notificationService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_CUSTOMER,
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
    getNotificationData : builder.query<any,{pageNo:Number,pageSize:Number}>({
      query: ({pageNo,pageSize}) => `${endpoints.GET_NOTIFICATION_DATA}?pageNo=${pageNo}&pageSize=${pageSize}`
    }), 
    postNotice: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.POST_NOTICE,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getAllNotices : builder.query<any,{apartmentId:Number,pageNo:Number,pageSize:Number}>({
      query: ({apartmentId,pageNo,pageSize}) => `${endpoints.GET_NOTICES}/${apartmentId}?pageNo=${pageNo}&pageSize=${pageSize}`
    }), 
    clearAllNotifications: builder.mutation<any, {}>({
      query: () => ({
        url: `${endpoints.CLEAR_ALL_NOTIFICATIONS}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
    useLazyGetNotificationDataQuery,
    usePostNoticeMutation,
    useLazyGetAllNoticesQuery,
    useClearAllNotificationsMutation,
} = notificationService;