import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
          body: cartData,
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (cartData: IBasketId) => ({
        url: '/baskets',
        method: 'DELETE',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),
    addBasketInWishList: builder.mutation({
      query: (wishListData: IProductId) => {
        return {
          url: '/wishlists/addBasket',
          method: 'POST',
          body: wishListData,
        };
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useAddBasketInWishListMutation,
} = cartApi;
