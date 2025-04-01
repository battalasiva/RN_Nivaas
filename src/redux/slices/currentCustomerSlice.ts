import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 currentCustomerData:any;
 customerOnboardReqData:any;
 profilePicture:any;
 premium:any;
}

const initialState: AuthState = {
    isLoading:false,
    currentCustomerData:null,
    customerOnboardReqData:null,
    profilePicture:null,
    premium:null,
};

export const currentCustomerSlice = createSlice({
  name: 'currentCustomerSlice',
  initialState,
  reducers: {
    setcurrentCustomerData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.currentCustomerData = action.payload;
    },
    setCustomerOnboardRequestsData :(state,action:PayloadAction<any>) => {      
      state.isLoading = true;
      state.customerOnboardReqData = action.payload;
    },
    setprofilePic:(state,action:PayloadAction<any>)=>{
      state.profilePicture = action.payload
    },
    setPremium:(state,action:PayloadAction<any>)=>{
      state.premium = action.payload
    },
  },
});

export const { setcurrentCustomerData,  setprofilePic,setCustomerOnboardRequestsData,setPremium} = currentCustomerSlice.actions;

export default currentCustomerSlice.reducer;