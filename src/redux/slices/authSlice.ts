import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userData: null;
  role: string | null;
  tokenType: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userData: null,
  role: null,
  tokenType: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.tokenType = action.payload.tokenType;
    },
    // userDataAction: (state, action: PayloadAction<any>) => {
    //   state.userData = action.payload;
    // },
    // updatUserDataAction: (state, action: PayloadAction<any>) => {
    //   state.userData = action.payload;
    // },
    logoutAction: state => {
      state.isLoggedIn = false;
      state.token = null;
      state.userData = null;
    },
  },
});

export const { loginAction, logoutAction } =
  authSlice.actions;

export default authSlice.reducer;
