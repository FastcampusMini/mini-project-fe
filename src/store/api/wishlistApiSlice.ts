import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base } from './apiSlice';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: base,
  tagTypes: ['WishList'],
  endpoints: (builder) => ({
    getWishList: builder.query<IData, String>({
      query: () => '/wishlists',
      providesTags: ['WishList'],
    }),
    addWishList: builder.mutation({
      query: (wishListData: IProductId) => {
        return {
          url: '/wishlists',
          method: 'POST',
          body: wishListData,
        };
      },
      invalidatesTags: ['WishList'],
    }),
    deleteWishList: builder.mutation({
      query: (wishListData: IWishListId) => ({
        url: '/wishlists',
        method: 'DELETE',
        body: wishListData,
      }),
      invalidatesTags: ['WishList'],
    }),
  }),
});

export const {
  useGetWishListQuery,
  useAddWishListMutation,
  useDeleteWishListMutation,
} = wishlistApi;
