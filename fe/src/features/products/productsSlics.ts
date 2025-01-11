import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  StacklineProducts,
  StacklineSale,
} from "../../services/products/types";
import { stacklineProductsApi } from "../../services/products/products";

export type StacklineProductData = {
  stacklineProductData: StacklineProducts;
  isLoading: boolean;
  shouldRerenderTable: boolean;
};

const initialState: StacklineProductData = {
  stacklineProductData: [],
  isLoading: true,
  shouldRerenderTable: true,
};

export type sortableValues = keyof StacklineSale;

const stacklineProductDataSlice = createSlice({
  name: "stacklineProductData",
  initialState,
  reducers: {
    sortStacklineProducts(
      state,
      action: PayloadAction<["asc" | "desc", sortableValues]>,
    ) {
      // If we are sorting it is at the state level, there is
      // nothing new to show, so there should not be a re-render.
      state.shouldRerenderTable = false;

      switch (action.payload[1]) {
        case "weekEnding":
          state.stacklineProductData[0].sales =
            state.stacklineProductData[0].sales.sort((a, b) => {
              if (action.payload[0] === "asc") {
                return new Date(a.weekEnding) > new Date(b.weekEnding) ? 1 : -1;
              }

              return new Date(a.weekEnding) > new Date(b.weekEnding) ? -1 : 1;
            });
          break;
        case "retailSales":
          state.stacklineProductData[0].sales =
            state.stacklineProductData[0].sales.sort((a, b) => {
              if (action.payload[0] === "asc") {
                return a.retailSales > b.retailSales ? 1 : -1;
              }

              return a.retailSales > b.retailSales ? -1 : 1;
            });
          break;
        case "wholesaleSales":
          state.stacklineProductData[0].sales =
            state.stacklineProductData[0].sales.sort((a, b) => {
              if (action.payload[0] === "asc") {
                return a.wholesaleSales > b.wholesaleSales ? 1 : -1;
              }

              return a.wholesaleSales > b.wholesaleSales ? -1 : 1;
            });
          break;
        case "unitsSold":
          state.stacklineProductData[0].sales =
            state.stacklineProductData[0].sales.sort((a, b) => {
              if (action.payload[0] === "asc") {
                return a.unitsSold > b.unitsSold ? 1 : -1;
              }

              return a.unitsSold > b.unitsSold ? -1 : 1;
            });
          break;
        case "retailerMargin":
          state.stacklineProductData[0].sales =
            state.stacklineProductData[0].sales.sort((a, b) => {
              if (action.payload[0] === "asc") {
                return a.retailerMargin > b.retailerMargin ? 1 : -1;
              }

              return a.retailerMargin > b.retailerMargin ? -1 : 1;
            });
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      stacklineProductsApi.endpoints.getStacklineProducts.matchFulfilled,
      (state, { payload }) => {
        state.stacklineProductData = payload;
        state.isLoading = false;
        // Whenever there is new data re-render the table
        state.shouldRerenderTable = true;
      },
    );
  },
});

export const { sortStacklineProducts } = stacklineProductDataSlice.actions;
export default stacklineProductDataSlice.reducer;
