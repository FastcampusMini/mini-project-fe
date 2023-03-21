import { createApi } from '@reduxjs/toolkit/query/react';
import { base } from './apiSlice';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: base,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrderList: builder.query<IOrderData, String>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    addOrderList: builder.mutation({
      query: (orderData: IProductsId) => {
        return {
          url: '/orders',
          method: 'POST',
          body: { products_id_list: orderData.products_id_list },
        };
      },
      invalidatesTags: ['Order'],
    }),
    deleteOrderList: builder.mutation({
      query: (orderData: IOrderId) => ({
        url: `/orders/${orderData.orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrderListQuery,
  useAddOrderListMutation,
  useDeleteOrderListMutation,
} = orderApi;
