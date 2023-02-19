import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base } from './apiSlice';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: base,
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
