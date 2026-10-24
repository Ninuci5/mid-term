import { createSlice } from "@reduxjs/toolkit";

export const AUTH_STORAGE_KEY = "shoply-auth-token";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isReady: false },
  reducers: {
    // Called once after hydration with the token restored from localStorage.
    restoreAuth(state, action) {
      state.token = action.payload;
      state.isReady = true;
    },
    loggedIn(state, action) {
      state.token = action.payload;
    },
    loggedOut(state) {
      state.token = null;
    },
  },
});

export const { restoreAuth, loggedIn, loggedOut } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthReady = (state) => state.auth.isReady;

export default authSlice.reducer;
