import { createSlice } from "@reduxjs/toolkit";

export const CART_STORAGE_KEY = "shoply-cart";
const MAX_QUANTITY = 10;

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      const { id, title, price, image } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + 1);
      } else {
        state.items.push({ id, title, price, image, quantity: 1 });
      }
    },
    increaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity = Math.min(MAX_QUANTITY, item.quantity + 1);
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) item.quantity = Math.max(1, item.quantity - 1);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
