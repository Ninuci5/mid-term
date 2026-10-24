"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AUTH_STORAGE_KEY, restoreAuth } from "./authSlice";
import { CART_STORAGE_KEY, setCart } from "./cartSlice";
import { makeStore } from "./store";

export default function StoreProvider({ children }) {
  const [store] = useState(makeStore);

  // Load after hydration so server and client markup match, then keep storage in sync.
  useEffect(() => {
    let token = null;
    try {
      token = window.localStorage.getItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Saved login could not be read.", error);
    }
    store.dispatch(restoreAuth(token));

    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) store.dispatch(setCart(parsed));
    } catch (error) {
      console.error("Saved cart data is invalid.", error);
    }

    let previous = store.getState().cart.items;
    return store.subscribe(() => {
      const current = store.getState().cart.items;
      if (current === previous) return;
      previous = current;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(current));
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
