import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const prepaidMeterService = createApi({
  reducerPath: 'prepaidMeterService',
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
    addPrepaidMeter: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ADD_PREPAIDMETER,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getAparmentPrepaidMeters : builder.query<any,{apartmentId:Number,pageNo:Number,pageSize:Number}>({
      query: ({apartmentId,pageNo,pageSize}) => `${endpoints.GET_APARTMENT_PREPAID_METERS}?apartmentId=${apartmentId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    updatePrepaidMeter: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.UPDATE_PREPAID_METER,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    onboardNewFlats: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ONBOARD_NEW_FLATS,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateConsumedUnits: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ADD_CONSUMED_UNITS,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),

});

export const {
    useAddPrepaidMeterMutation,
    useLazyGetAparmentPrepaidMetersQuery,
    useUpdatePrepaidMeterMutation,
    useOnboardNewFlatsMutation,
    useUpdateConsumedUnitsMutation,
} = prepaidMeterService;