// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StacklineProducts } from "./types";

// const domain = window.location.hostname;
const domain = "http://localhost:3000";
const path = "/api";

// Define a service using a base URL and expected endpoints
export const stacklineProductsApi = createApi({
  reducerPath: "stacklineProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: domain + path,
    responseHandler: "json",
  }),
  endpoints: (builder) => ({
    getStacklineProducts: builder.query<StacklineProducts, string>({
      query: () => "/products",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetStacklineProductsQuery } = stacklineProductsApi;
