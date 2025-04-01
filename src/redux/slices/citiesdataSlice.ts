import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 citiesData:any;
 selectedApartment:any;
 approvedApartments:any;
}

const initialState: AuthState = {
    isLoading:false,
    citiesData:null,
    selectedApartment:null,
    approvedApartments:null,
};

export const citiesdataSlice = createSlice({
  name: 'citiesdataSlice',
  initialState,
  reducers: {
    setcitiesData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.citiesData = action.payload;
    },
    setDefaultApartment :(state,action:PayloadAction<any>) => {
      state.isLoading = true;
      state.selectedApartment = action.payload;
    },
    setApprovedApartments:(state,action:PayloadAction<any>) => {
      state.isLoading = true;
      state.approvedApartments = action.payload;
    },
  },
});

export const { setcitiesData,setDefaultApartment,setApprovedApartments} =
  citiesdataSlice.actions;
export default citiesdataSlice.reducer;
