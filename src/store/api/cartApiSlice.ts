import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    // env로
    baseUrl: 'http://52.78.32.230:8080/api',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODA0NjMxLCJleHAiOjE2NzY4MDY0MzEsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.hqqCJUNC8Yu-9CPJF1uHNyEDm9XEMkHAszP-hIiPnbc`,
      );
      headers.set('Content-Type', 'application/json');
      console.log(headers);
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<ICart, String>({
      query: () => '/basket',
      providesTags: ['Cart'],
    }),
    addCart: builder.mutation({
      query: (cartData: ICartData) => {
        return {
          url: '/basket',
          method: 'POST',
          body: cartData,
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (cartData: ICartDataDelete) => ({
        url: '/basket',
        method: 'DELETE',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),
    addBasketInWishList: builder.mutation({
      query: (wishListData: ICartData) => {
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

// 나중에 추가되는 데이터 있을 예정이니 다시 작성하기
export interface ICart {
  code: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  basketId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  price: number;
}

export interface ICartData {
  productId: number;
}

export interface ICartDataDelete {
  basketId: number;
}

export const {
  useGetCartQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useAddBasketInWishListMutation,
} = cartApi;
