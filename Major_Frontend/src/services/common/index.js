import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = localStorage.getItem("authToken");
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (task) => ({
        url: "/api_registration",
        method: "POST",
        body: task,
      }),
    }),
    loginUser: builder.mutation({
      query: (task) => ({
        url: "/api_login",
        method: "POST",
        body: task,
      }),
    }),
    getRetailerForSupplier: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getRetailersForSupplier",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: task,
        };
      },
    }),
    getInventoryForRetailerBySupplier: builder.mutation({
      query: (task) => {
        const token = localStorage.getItem("authToken");

        return {
          url: "/api_getInventoryForRetailerBySupplier",
          method: "POST",
          body: task,
        };
      },
    }),
    getDriverDetails: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_drivers",
          method: "POST",
          body: task,
        };
      },
    }),
    getRetailerInventory: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getInventory",
          method: "POST",
          body: task,
        };
      },
    }),
    postProductReqRetailer: builder.mutation({
      query: (task) => {
        return {
          url: "/api_productRequests",
          method: "POST",
          body: task,
        };
      },
    }),
    getProductReqSupplier: builder.mutation({
      query: (task) => {
        return {
          url: "/api_SeeProductRequests",
          method: "POST",
          body: task,
        };
      },
    }),
    getSupplierForRetailer: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getSuppliersForRetailer",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: task,
        };
      },
    }),
    postAddProduct: builder.mutation({
      query: (task) => {
        return {
          url: "/api_add_product",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: task,
        };
      },
    }),
    postSaleProduct: builder.mutation({
      query: (task) => {
        return {
          url: "/api_update_quantity",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: task,
        };
      },
    }),
    getSalesDta: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_sales_data",
          method: "POST",
          body: task,
        };
      },
    }),
    postUpdateStatus: builder.mutation({
      query: (task) => {
        return {
          url: "/api_updateProductRequestStatus ",
          method: "POST",
          body: task,
        };
      },
    }),
    postMyRequest: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getRetailerProductRequests",
          method: "POST",
          body: task,
        };
      },
    }),
    getExpiringProducts: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getExpiringProducts",
          method: "POST",
          body: task,
        };
      },
    }),
    postTransferTask: builder.mutation({
      query: (task) => {
        return {
          url: "/assign_transfer_task",
          method: "POST",
          body: task,
        };
      },
    }),
    getExpiringProductsForSupplier: builder.mutation({
      query: (task) => {
        return {
          url: "/api_getExpiringProductsForSupplier",
          method: "POST",
          body: task,
        };
      },
    }),
    getTransferTaskData: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_tranferTask_data",
          method: "POST",
          body: task,
        };
      },
    }),
    getSavedProductsDataRetailer: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_savedProductsDataRetailer",
          method: "POST",
          body: task,
        };
      },
    }),
    getSavedProductsDataSupplier: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_savedProductsDataSupplier",
          method: "POST",
          body: task,
        };
      },
    }),
    getCompletedTransferTaskCoun: builder.mutation({
      query: (task) => {
        return {
          url: "/api_get_completed_TransferTask_count",
          method: "POST",
          body: task,
        };
      },
    }),
    getWebStats: builder.mutation({
      query: () => {
        return {
          url: "/api_getwebStats",
          method: "GET",
        };
      },
    }),
    getAdminData: builder.mutation({
      query: () => {
        return {
          url: "/api_getSuppliersAndRetailers",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetRetailerForSupplierMutation,
  useGetInventoryForRetailerBySupplierMutation,
  useGetDriverDetailsMutation,
  useGetRetailerInventoryMutation,
  usePostProductReqRetailerMutation,
  useGetProductReqSupplierMutation,
  useGetSupplierForRetailerMutation,
  usePostAddProductMutation,
  usePostSaleProductMutation,
  useGetSalesDtaMutation,
  usePostUpdateStatusMutation,
  usePostMyRequestMutation,
  useGetExpiringProductsMutation,
  usePostTransferTaskMutation,
  useGetExpiringProductsForSupplierMutation,
  useGetTransferTaskDataMutation,
  useGetSavedProductsDataRetailerMutation,
  useGetSavedProductsDataSupplierMutation,
  useGetCompletedTransferTaskCounMutation,
  useGetWebStatsMutation,
  useGetAdminDataMutation,
} = apiSlice;
export default apiSlice;
