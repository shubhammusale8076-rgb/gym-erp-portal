import { createSlice } from '@reduxjs/toolkit';
import { clearAuthData, setAuthData, isAuthenticated } from '../utils/auth';

const initialState = {
  isAuthenticated: isAuthenticated(),
  isSessionExpired: false, // Used to trigger the session expired modal
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userId, role } = action.payload;
      setAuthData(token, userId, role);
      state.isAuthenticated = true;
      state.isSessionExpired = false;
    },
    logout: (state) => {
      clearAuthData();
      state.isAuthenticated = false;
      state.isSessionExpired = false;
    },
    sessionExpired: (state) => {
      clearAuthData();
      state.isAuthenticated = false;
      state.isSessionExpired = true;
    },
    resetSessionExpired: (state) => {
      state.isSessionExpired = false;
    }
  },
});

export const { loginSuccess, logout, sessionExpired, resetSessionExpired } = authSlice.actions;
export default authSlice.reducer;
