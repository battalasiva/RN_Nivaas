import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_CUSTOMER, BASE_URL_SERVICES} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';

export const nivaasServices = createApi({
  reducerPath: 'nivaasServices',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_SERVICES,
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
    getServiceCategories : builder.query<any,{}>({
      query: () => `${endpoints.GET_SERVICES_LIST}`
    }),
  }),
});

export const nivaaComplaintServices = createApi({
  reducerPath: 'nivaaComplaintServices',
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
    raiseComplaint: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.RAISE_COMPLAINT,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getComplaintsData : builder.query<any,{apartmentId:Number,page:Number,size:Number}>({
      query: ({apartmentId,page,size}) => `${endpoints.GET_COMPLAINT_LIST}/${apartmentId}?page=${page}&&size=${size}`
    }),
    updateComplaintStatus: builder.mutation<any, { payload: any, id: Number, status: String, assignedTo?: Number }>({
      query: ({ payload, id, status, assignedTo }) => {
        console.log(id,status,assignedTo,'kkkkaldjcnaljdnqjewdljqxljqwlk');
        
        const baseUrl = `${endpoints.UPDATE_COMPLAINT_STATUS}/${id}?status=${status}`;
        const assignedToQuery = assignedTo !== null && assignedTo !== undefined ? `&&assignedTo=${assignedTo}` : '';
        return {
          url: `${baseUrl}${assignedToQuery}`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),    
    getAdminsData : builder.query<any,{apartmentId:Number}>({
      query: ({apartmentId}) => `${endpoints.GET_ADMINS_LIST}/${apartmentId}`
    }), 
    addDefaultPartner: builder.mutation<any, {id:Number,payload:any}>({
      query: ({payload,id}) => ({
        url: `${endpoints.SET_DEFAULT_PARTNER}?id=${id}`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    addApartmentServicePartner: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ADD_APARTMENT_SERVICE_PARTNER,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getApartmentServiceProviders : builder.query<any,{apartmentId:Number,categoryId:Number}>({
      query: ({apartmentId,categoryId}) => `${endpoints.GET_APARTMENT_SERV_PROVIDER}?apartmentId=${apartmentId}&categoryId=${categoryId}`
    }),
    getServiceCategoriesList : builder.query<any,{}>({
      query: () => `${endpoints.GET_SERVICE_CATEGORIES}`
    }),
    raiseServiceRequest: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.RAISE_SERVICE_REQUEST,
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
 useLazyGetServiceCategoriesQuery,
} = nivaasServices;

export const {
  useLazyGetAdminsDataQuery,
  useLazyGetComplaintsDataQuery,
  useRaiseComplaintMutation,
  useUpdateComplaintStatusMutation,
  useAddDefaultPartnerMutation,
  useAddApartmentServicePartnerMutation,
  useLazyGetApartmentServiceProvidersQuery,
  useLazyGetServiceCategoriesListQuery,
  useRaiseServiceRequestMutation,
 } = nivaaComplaintServices;