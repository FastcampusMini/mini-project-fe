import { createApi } from '@reduxjs/toolkit/query/react';
import { base } from './apiSlice';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: base,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<IData, String>({
      query: () => '/baskets',
      providesTags: ['Cart'],
    }),
    addCart: builder.mutation({
      query: (cartData: IProductId) => {
        return {
          url: '/baskets',
          method: 'POST',
          body: { productId: cartData.productId },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (cartData: IBasketId) => ({
        url: `/baskets/${cartData.basketId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartApi;
