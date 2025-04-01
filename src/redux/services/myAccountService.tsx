import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_USER,BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';

export const myAccountService = createApi({
  reducerPath: 'myAccountService',
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
    addCoadmin: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ADD_CO_ADMIN,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getFlatOwners : builder.query<any,{apartmentID:Number,pageNo:Number,pageSize:Number}>({
      query: ({apartmentID,pageNo,pageSize}) => `${endpoints.GET_FLAT_OWNERS}/${apartmentID}/flat-owners?pageNo=${pageNo}&pageSize=${pageSize}`
    }),
  }),
});

export const profileService = createApi({
  reducerPath: 'profileService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_USER,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), 
  endpoints: builder => ({
    postProfilePic: builder.mutation<any, {}>({
      query: formdata => ({
        url: endpoints.PROFILE_PIC,
        method: 'POST',
        body: formdata,
      }),
    }),
    editprofile: builder.mutation<any, {id:Number,fullName:String,email:String}>({
      query:({id,fullName,email}) =>({
        url:`${endpoints.EDIT_PROFILE}/${id}`,
        method:'PUT',
        body:{fullName,email}
      })
    })
  }),
});




export const {
  useAddCoadminMutation,
  useLazyGetFlatOwnersQuery,
} = myAccountService;

export const {
  usePostProfilePicMutation,
  useEditprofileMutation
} = profileService;