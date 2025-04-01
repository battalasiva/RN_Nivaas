import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import {endpoints} from '../../api';

export const expancesService = createApi({
  reducerPath: 'expancesService',
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
    getAllExpances: builder.query<any,{apartmentID: Number; year: Number; month: Number}>({
      query: ({apartmentID, year, month}) =>
        `${endpoints.GET_EXPANCES}/${apartmentID}/year/${year}/month/${month}`,
    }),
    getExpancesById: builder.query<any, {id: Number}>({
      query: ({id}) => `${endpoints.GET_EXPANCES_BY_ID}/${id}`,
    }),
    getExpancesPDF: builder.query<any,{apartmentID: number; year: number; month: number}>({
      query: ({apartmentID, year, month}) => ({
        url: `${endpoints.GET_EXPANCES_PDF}/${apartmentID}/year/${year}/month/${month}`,
        method: 'GET',
        responseHandler: response => response.blob(),
      }),
    }),
    addDebitHistory: builder.mutation<any, {}>({
      query: payload => ({
        url: `${endpoints.ADD_DEBIT_HISTORY}`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteExpances: builder.mutation<any, {apartmentID: number; id: number}>({
      query: ({apartmentID, id}) => ({
        url: `${endpoints.DELETE_EXPANCES}/${apartmentID}/debit/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    updateDebitHistory: builder.mutation<any, {id: Number; payload: any}>({
      query: ({payload, id}) => ({
        url: `${endpoints.UPDATE_DEBIT_HISTORY}/${id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getallCredits: builder.query<any,{apartmentID: Number; year: Number; month: Number}>({
      query: ({apartmentID, year, month}) =>
        `${endpoints.GET_CREDIT_HISTORY}/${apartmentID}/year/${year}/month/${month}`,
    }),
    deleteCreditHistory: builder.mutation<any, {apartmentID: number; id: number}>({
      query: ({apartmentID, id}) => ({
        url: `${endpoints.DELETE_CREDIT_HISTORY}/${apartmentID}/credit/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    addCreditHistory: builder.mutation<any, {}>({
      query: payload => ({
        url: `${endpoints.ADD_CREDIT_HISTORY}`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateCreditHistory: builder.mutation<any, {id: Number; payload: any}>({
      query: ({payload, id}) => ({
        url: `${endpoints.UPDATE_CREDIT_HISTORY}/${id}`,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getCurrentBalence: builder.query<any, {id: Number}>({
      query: ({id}) => `${endpoints.CURRENT_BALENCE}/${id}`,
    }),
    refreshCurrentBalence: builder.mutation<any, {id:Number}>({
      query: ({id}) => ({
        url: `${endpoints.REFRESH_CURRENT_BALENCE}/${id}/refresh`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useLazyGetAllExpancesQuery,
  useLazyGetExpancesByIdQuery,
  useLazyGetExpancesPDFQuery,
  useAddDebitHistoryMutation,
  useDeleteExpancesMutation,
  useUpdateDebitHistoryMutation,
  useLazyGetallCreditsQuery,
  useDeleteCreditHistoryMutation,
  useAddCreditHistoryMutation,
  useUpdateCreditHistoryMutation,
  useLazyGetCurrentBalenceQuery,
  useRefreshCurrentBalenceMutation,
} = expancesService;
