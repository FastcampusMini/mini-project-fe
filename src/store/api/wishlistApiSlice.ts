import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    // env로
    baseUrl: 'http://52.78.32.230:8080/api',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODA0NjMxLCJleHAiOjE2NzY4MDY0MzEsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.hqqCJUNC8Yu-9CPJF1uHNyEDm9XEMkHAszP-hIiPnbc`,
      );
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['WishList'],
  endpoints: (builder) => ({
    getWishList: builder.query<IWishList, String>({
      query: () => '/wishlists',
      providesTags: ['WishList'],
    }),
    addWishList: builder.mutation({
      query: (wishListData: IWishListData) => {
        return {
          url: '/wishlists',
          method: 'POST',
          body: wishListData,
        };
      },
      invalidatesTags: ['WishList'],
    }),
    deleteWishList: builder.mutation({
      query: (wishListData: IWishListDataDelete) => ({
        url: '/wishlists',
        method: 'DELETE',
        body: wishListData,
      }),
      invalidatesTags: ['WishList'],
    }),
  }),
});

// 나중에 추가되는 데이터 있을 예정이니 다시 작성하기
export interface IWishList {
  code: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  wishlistId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  price: number;
}

export interface IWishListData {
  productId: number;
}

export interface IWishListDataDelete {
  wishlistId: number;
}

export const {
  useGetWishListQuery,
  useAddWishListMutation,
  useDeleteWishListMutation,
} = wishlistApi;
