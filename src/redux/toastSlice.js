import { createSlice } from '@reduxjs/toolkit';

let id = 0;

const toastSlice = createSlice({
  name: 'toast',
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type } = action.payload || {};
      if (!message) return;
      state.push({
        id: ++id,
        message,
        type: type || 'success',
      });
    },
    removeToast: (state, action) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
