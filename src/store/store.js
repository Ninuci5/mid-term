import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const makeStore = () =>
  configureStore({ reducer: { cart: cartReducer, auth: authReducer } });
