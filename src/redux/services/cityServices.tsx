import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_CORE, BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';

// Define a service using a base URL and expected endpoints

export const cityService = createApi({
  reducerPath: 'cityService',
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
    getApartmentList : builder.query<any,{cityId:Number,pageNo:Number,pageSize:Number}>({
      query: ({cityId,pageNo,pageSize}) => `${endpoints.GET_APARTMENT}?cityId=${cityId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getapartmentsBySearch: builder.mutation<any, {cityId:Number,pageNo:Number,pageSize:Number,payload:any}>({
      query: ({cityId,pageNo,pageSize,payload}) => ({
        url: `${endpoints.SEARCH_NEARBY_APARTMENTS}/${cityId}?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'POST',
        body: payload,
      }),
    }),
    getFlatsList : builder.query<any,{apartmentId:Number,pageNo:Number,pageSize:Number,type:Boolean}>({
      query: ({apartmentId,pageNo,pageSize,type}) => `${endpoints.GET_FLATS}?apartmentId=${apartmentId}&pageNo=${pageNo}&pageSize=${pageSize}&allFlats=${type}`
    }),
    getFlatsForOwners : builder.query<any,{apartmentId:Number,pageNo:Number,pageSize:Number}>({
      query: ({apartmentId,pageNo,pageSize}) => `${endpoints.GET_FLATS_OWNERS}?apartmentId=${apartmentId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getflatsBySearch: builder.mutation<any, {apartmentId:Number,pageNo:Number,pageSize:Number,payload:any}>({
      query: ({apartmentId,pageNo,pageSize,payload}) => ({
        url: `${endpoints.GET_FLATS_BY_SEARCH}/${apartmentId}/flats?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'POST',
        body: payload,
      }),
    }),
    getPostalCodeList : builder.query<any,{pageNo:Number,pageSize:Number}>({
      query: ({pageNo,pageSize}) => `${endpoints.GET_POSTALCODES}?pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getCustomerOnboardRequests : builder.query<any,{}>({
      query: () => `${endpoints.GET_CUSTOMER_ONBOARD_REQUESTS}`
    }),
    getFlatDetailsList : builder.query<any,{flatId:Number}>({
      query: ({flatId}) => `${endpoints.GET_FLAT_DETAILS}/${flatId}`
    }),
    userOnBoarding: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.ONBOARD_TENANT,
        method: 'POST',
        body: payload,
      }),
    }),
    tenantApprovel: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.APPROVE_TENANT,
        method: 'POST',
        body: payload,
      }),
    }),
    flatownerOnboarding: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.ONBOARD_FLAT_OWNER,
        method: 'POST',
        body: payload,
      }),
    }),
    flatOwnerApprovel: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.APPROVE_FLAT_OWNER,
        method: 'POST',
        body: payload,
      }),
    }),
    newApartmentOnboarding: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.NEW_APARTMENT_ONBOARD,
        method: 'POST',
        body: payload,
      }),
    }),
    getCurrentuserApartments : builder.query<any,{}>({
      query: () => `${endpoints.GET_CURRENTUSER_APARTMENTS}`
    }),
    postDefaultApartment: builder.mutation<any, {userId:Number,apartmentId:Number,payload:any}>({
      query: ({payload,userId,apartmentId}) => ({
        url: `${endpoints.POST_DEFAULT_APARTMENT}/?userId=${userId}&apartmentId=${apartmentId} `,
        method: 'PUT',
        body: payload,
      }),
    }),
    getDefaultApartment : builder.query<any,{cityId:Number,pageNo:Number,pageSize:Number}>({
      query: ({cityId,pageNo,pageSize}) => `${endpoints.GET_DEFAULT_APARTMENT}?cityId=${cityId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    flatsOnboardingWithoutDetails: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.FLATS_ONBOARDING_WITHOUT_DETAILS,
        method:'POST',
        body: payload,
      }),
    }),
    getFlatOwnerDetails : builder.query<any,{apartmentID:Number}>({
      query: ({apartmentID}) => `${endpoints.GET_FLAT_OWNER_DETAILS}/${apartmentID}`
    }),
    removeTenant: builder.mutation<any, {relatedUserId:Number,onboardingRequestId:Number}>({
      query: ({relatedUserId, onboardingRequestId}) => ({
        url: `${endpoints.REMOVE_TENENT}?relatedUserId=${relatedUserId}&onboardingRequestId=${onboardingRequestId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    rejectRequest: builder.mutation<any, {userId:Number,onboardingRequestId:Number}>({
      query: ({userId, onboardingRequestId}) => ({
        url: `${endpoints.REJECT_REQUEST}?onboardingRequestId=${onboardingRequestId}&userId=${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    postFlatDetails: builder.mutation<any, {payload:any,flatId:Number}>({
      query: ({payload,flatId}) => ({
        url: `${endpoints.POST_FLAT_DETAILS}/${flatId}`,
        method:'POST',
        body: payload,
      }),
    }),
    postAvailableFlatsForRent: builder.mutation<any, {payload:any,flatId:Number,availableForRent:Boolean}>({
      query: ({payload,flatId,availableForRent}) => ({
        url: `${endpoints.FLATS_AVAILABLE_FOR_RENT}/${flatId}?availableForRent=${availableForRent}`,
        method:'POST',
        body: payload,
      }),
    }),
    postAvailableflatsForSale: builder.mutation<any, {payload:any,flatId:Number,availableForSale:Boolean}>({
      query: ({payload,flatId,availableForSale}) => ({
        url: `${endpoints.FLATS_AVAILABLE_FOR_SALE}/${flatId}?availableForSale=${availableForSale}`,
        method:'POST',
        body: payload,
      }),
    }),
  }),
});

export const cityServiceCore = createApi({
  reducerPath: 'cityServiceCore',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_CORE,
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
    getCityList: builder.query<any, {pageNo:Number,pageSize:Number}>({
      query: ({pageNo,pageSize}) => `${endpoints.GET_CITY}?pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    getcityListBySearch: builder.mutation<any, {payload:any,pageNo:Number,pageSize:Number}>({
      query: ({payload,pageNo,pageSize}) => ({
        url: `${endpoints.GET_CITY_BY_SEARCH}?pageNo=${pageNo}&pageSize=${pageSize}`,
        method:'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetApartmentListQuery,
  useGetapartmentsBySearchMutation,
  useLazyGetFlatsListQuery,
  useLazyGetFlatsForOwnersQuery,
  useGetflatsBySearchMutation,
  useLazyGetCustomerOnboardRequestsQuery,
  useLazyGetFlatDetailsListQuery,
  useLazyGetPostalCodeListQuery,
  useUserOnBoardingMutation,
  useTenantApprovelMutation,
  useFlatownerOnboardingMutation,
  useFlatOwnerApprovelMutation,
  useNewApartmentOnboardingMutation,
  useLazyGetCurrentuserApartmentsQuery,
  usePostDefaultApartmentMutation,
  useLazyGetDefaultApartmentQuery,
  useFlatsOnboardingWithoutDetailsMutation,
  useLazyGetFlatOwnerDetailsQuery,
  useRemoveTenantMutation,
  useRejectRequestMutation,
  usePostFlatDetailsMutation,
  usePostAvailableFlatsForRentMutation,
  usePostAvailableflatsForSaleMutation,
} = cityService;


export const {
 useLazyGetCityListQuery,
 useGetcityListBySearchMutation,
} = cityServiceCore;