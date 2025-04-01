
export const endpoints = {
  //access-mgmt
  OTP_TRIGGER:'nivaas/auth/jtuserotp/trigger',
  SIGN_IN:'nivaas/auth/signin',
  CURRENT_CUSTOMER:'nivaas/auth/currentCustomer',
  USER_DETAILS:'user/userDetails',
  PROFILE_PIC:'user/upload',
  EDIT_PROFILE:'user',
  REFRESH_TOKEN:'nivaas/auth/refreshToken',

  //core
  GET_CITY:'nivaascity/list',
  GET_CITY_BY_SEARCH : 'nivaascity/search',
  //jtapartment
  GET_APARTMENT:'jtapartment/nearbyapartments',
  SEARCH_NEARBY_APARTMENTS :'jtapartment/city',
  NEW_APARTMENT_ONBOARD:'jtapartment/save',
  ADD_CO_ADMIN:'jtapartment/add/co-admin',

  //jtflat
  GET_FLATS:'jtflat/apartment/flats',
  GET_FLATS_OWNERS:'jtflat/without-owners/flat/list',
  GET_FLATS_BY_SEARCH:'jtflat/apartment',
  ONBOARD_NEW_FLATS:'jtflat/bulk/onboard',
  UPDATE_ONBOARDED_FLATS_DETAILS:'jtflat/apartment',
  GET_FLAT_OWNERS:'jtflat',
  FLATS_ONBOARDING_WITHOUT_DETAILS: 'jtflat/without-owners/bulk/onboard',
  REMOVE_TENENT : 'jtflat/tenant/remove',
  POST_FLAT_DETAILS:'jtflat/manage/flat',
  GET_FLAT_DETAILS:'jtflat/details',
  FLATS_AVAILABLE_FOR_RENT :'jtflat/manage/rent',
  FLATS_AVAILABLE_FOR_SALE :'jtflat/manage/sale',

  //onboarding
  GET_CUSTOMER_ONBOARD_REQUESTS:'onboarding/requests',
  GET_POSTALCODES:'jtpostalcode/list',
  ONBOARD_TENANT :'onboarding/flat/request',
  APPROVE_TENANT:'onboarding/approve/flat/related-user',
  ONBOARD_FLAT_OWNER:'onboarding/flat_owner/request',
  APPROVE_FLAT_OWNER:'onboarding/approve/falt_owner',
  GET_FLAT_OWNER_DETAILS:'onboarding/flat/list',
  REJECT_REQUEST:'onboarding/reject',
  
  //prepaidmeter
  ADD_PREPAIDMETER:'/prepaidmeter/save',
  GET_APARTMENT_PREPAID_METERS:'prepaidmeter/list',
  UPDATE_PREPAID_METER:'prepaidmeter/update',
  LAST_ADDED_CONSUMPTION:'prepaid-usage/apartment',

  //jtmaintanance
  MAINTAINENCE_SAVE:'jtmaintanance/save',
  MAINTAINENCE_LAST_UPDATED:'jtmaintanance',
  ADD_CONSUMED_UNITS:'/prepaid-usage/flat/update-consumed',

  //society
  USER_SOCIETY_DUES:'society/dues/apartment',
  ADMIN_SOCIETY_DUES:'society/dues/list',
  UPDATE_PAID_STATUS:'society/update',
  GET_EXPANCES:'apartment/debit-history/apartment',
  GET_EXPANCES_BY_ID:'apartment/debit-history',
  GET_EXPANCES_PDF:'report/apartment',
  ADD_DEBIT_HISTORY:'apartment/debit-history',
  DELETE_EXPANCES:'apartment/debit-history/apartment',
  UPDATE_DEBIT_HISTORY:'apartment/debit-history',
  ADD_CREDIT_HISTORY:'apartment/credit-history/save',
  UPDATE_CREDIT_HISTORY:'apartment/credit-history',
  GET_CREDIT_HISTORY:'apartment/credit-history/apartment',
  DELETE_CREDIT_HISTORY:'apartment/credit-history/apartment',
  BALANCE_REPORT_PDF:'report/balance/apartment',
  CURRENT_BALENCE : 'apartment/current-balance',
  REFRESH_CURRENT_BALENCE : 'apartment/current-balance',

  //Notification
  GET_NOTIFICATION_DATA:'jtnotification/user/list',
  CLEAR_ALL_NOTIFICATIONS:'jtnotification/clear-all',
  POST_NOTICE :'noticeboard/save',
  GET_NOTICES : 'noticeboard/list',
  GET_CURRENTUSER_APARTMENTS:'current-apartment/get',
  POST_DEFAULT_APARTMENT : 'current-apartment/set',
  GET_DEFAULT_APARTMENT:'',

  //complaints & services
  GET_SERVICES_LIST:'category/list',
  RAISE_COMPLAINT : 'complaints/raise',
  GET_ADMINS_LIST : 'apartment/users/admins',
  GET_COMPLAINT_LIST : 'complaints/apartment',
  UPDATE_COMPLAINT_STATUS : 'complaints/update-status',
  GET_SERVICE_CATEGORIES : 'apartment-partner/categories',
  GET_CATEGORY_BASED_PARTNERS : 'apartment-partner/partners',
  SET_DEFAULT_PARTNER : 'apartment-partner/set-default-partner',
  ADD_APARTMENT_SERVICE_PARTNER:'apartment-partner/onboard',
  GET_APARTMENT_SERV_PROVIDER:'apartment-partner/partners',
  RAISE_SERVICE_REQUEST :'service-request/raise-request',

  //coins and payments
  GET_COINS_HISTORY:'apartment/coins/get/history',
  GET_COINS_BY_APARTMENT : 'apartment/coins/get',
  ADD_SUBSCRIPTION :'jtapartment/subscription/renew',
  REQ_COINS_TO_SUBSCRIPTION : 'jtapartment/subscription/coins',
  GET_SUBSCRIPTION_PLANS : 'jtapartment/subscription/plans',
};