import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_CUSTOMER } from '../../api/api';
import { RootState } from '../store';
import { endpoints } from '../../api';

export const coinsAndPaymentsService = createApi({
  reducerPath: 'coinsAndPaymentsService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_CUSTOMER,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getcoinsHistory: builder.query<any, { apartmentId: Number, pageNo: Number, pageSize: Number }>({
      query: ({ apartmentId, pageNo, pageSize }) => `${endpoints.GET_COINS_HISTORY}/${apartmentId}?pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getcoinsByApartment: builder.query<any, { apartmentId: Number }>({
      query: ({ apartmentId }) => `${endpoints.GET_COINS_BY_APARTMENT}?apartmentId=${apartmentId}`
    }),
    requiredCoinsToSubscribe: builder.query<any, { apartmentId: Number, months: Number }>({
      query: ({ apartmentId, months }) => `${endpoints.REQ_COINS_TO_SUBSCRIPTION}/${apartmentId}?months=${months}`
    }),
    addSubscription: builder.mutation<any, { apartmentId: Number, months: Number, payload: any }>({
      query: ({ payload, apartmentId, months }) => ({
        url: `${endpoints.ADD_SUBSCRIPTION}/${apartmentId}?months=${months}`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getSubscriptionPlans: builder.query<any, { apartmentId: Number }>({
      query: ({ apartmentId }) => `${endpoints.GET_SUBSCRIPTION_PLANS}/${apartmentId}`
    }),
  }),
});

export const {
  useLazyGetcoinsByApartmentQuery,
  useLazyGetcoinsHistoryQuery,
  useLazyRequiredCoinsToSubscribeQuery,
  useAddSubscriptionMutation,
  useLazyGetSubscriptionPlansQuery,
} = coinsAndPaymentsService;