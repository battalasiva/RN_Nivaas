import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Import all reducers here
import authSlice from './slices/authSlice';
import { authService } from './services/authService';
import { cityService, cityServiceCore } from './services/cityServices';
import citiesdataSlice from './slices/citiesdataSlice';
import flatsDataSlice from './slices/flatsSlice';
import { myAccountService, profileService } from './services/myAccountService';
import currentCustomerSlice from './slices/currentCustomerSlice';
import { prepaidMeterService } from './services/prepaidMeterService';
import { maintainenceService } from './services/maintainenceService';
import { expancesService } from './services/expansesServices';
import { notificationService } from './services/notificationService';
import { nivaaComplaintServices, nivaasServices } from './services/nivaasServicesService';
import { coinsAndPaymentsService } from './services/coinsAndPaymentsService';


const rootReducers = combineReducers({
  auth: authSlice,
  cityData:citiesdataSlice,
  flatsData:flatsDataSlice,
  currentCustomer:currentCustomerSlice,
  [authService.reducerPath]: authService.reducer,
  [cityService.reducerPath]: cityService.reducer,
  [cityServiceCore.reducerPath] : cityServiceCore.reducer,
  [myAccountService.reducerPath]:myAccountService.reducer,
  [prepaidMeterService.reducerPath]:prepaidMeterService.reducer,
  [maintainenceService.reducerPath]:maintainenceService.reducer,
  [expancesService.reducerPath]:expancesService.reducer,
  [profileService.reducerPath]:profileService.reducer,
  [notificationService.reducerPath]:notificationService.reducer,
  [nivaasServices.reducerPath]:nivaasServices.reducer,
  [nivaaComplaintServices.reducerPath]:nivaaComplaintServices.reducer,
  [coinsAndPaymentsService.reducerPath]:coinsAndPaymentsService.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authService.middleware,
      cityService.middleware,
      cityServiceCore.middleware,
      myAccountService.middleware,
      prepaidMeterService.middleware,
      maintainenceService.middleware,
      expancesService.middleware,
      profileService.middleware,
      notificationService.middleware,
      nivaasServices.middleware,
      nivaaComplaintServices.middleware,
      coinsAndPaymentsService.middleware,
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
