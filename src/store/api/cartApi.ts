import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    // env로
    baseUrl: 'http://52.78.32.230:8080',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2NjQ3Njk3LCJleHAiOjE2NzY2NDk0OTcsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.1A1svRtVD2sItvJf01Wp_VzB5Wha3V_jf8i7CCirMgM`,
      );
      headers.set('Content-Type', 'application/json');
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
          url: '/basket/add',
          method: 'POST',
          body: cartData,
        };
      },
      invalidatesTags: ['Cart'],
    }),
    deleteCart: builder.mutation({
      query: (cartData: ICartData) => ({
        url: 'basket/delete',
        method: 'DELETE',
        body: cartData,
      }),
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

export const { useGetCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartApi;
