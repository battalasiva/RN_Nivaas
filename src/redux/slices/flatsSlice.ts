import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
 isLoading:boolean;
 setFlatData:any;
 blocksData:any;
}

const initialState: AuthState = {
    isLoading:false,
    setFlatData:null,
    blocksData:null
};

export const flatsDataSlice = createSlice({
  name: 'flatsDataSlice',
  initialState,
  reducers: {
    setFlatData :(state,action:PayloadAction<any>) => {
        state.isLoading = true;
        state.setFlatData = action.payload;
    },
  },
});

export const {setFlatData } =
  flatsDataSlice.actions;

export default flatsDataSlice.reducer;
