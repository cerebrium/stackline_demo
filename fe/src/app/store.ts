import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { stacklineProductsApi } from "../services/products/products.ts";
import stacklineProductDataReducer from "../features/products/productsSlics.ts";

export const store = configureStore({
  reducer: {
    [stacklineProductsApi.reducerPath]: stacklineProductsApi.reducer,
    stacklineProductData: stacklineProductDataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stacklineProductsApi.middleware),
});

setupListeners(store.dispatch);
