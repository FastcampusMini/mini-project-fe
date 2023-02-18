import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    // env로
    baseUrl: 'http://52.78.32.230:8080/api',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2NzM0MjA4LCJleHAiOjE2NzY3MzYwMDgsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.chjOt-JocyyZ9qCCgFKn7zyFeGllRmSz-qKlrxxxxJw`,
      );
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrderList: builder.query<IOrder, String>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    addOrderList: builder.mutation({
      query: (orderData: IOrderData) => {
        return {
          url: '/orders',
          method: 'POST',
          body: orderData,
        };
      },
      invalidatesTags: ['Order'],
    }),
    deleteOrderList: builder.mutation({
      query: (orderData: IOrderDataDelete) => ({
        url: '/orders',
        method: 'DELETE',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

// 나중에 추가되는 데이터 있을 예정이니 다시 작성하기
export interface IOrder {
  code: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  orderId: number;
  purchaseDate: number[];
  purchasedProductList: PurchasedProductList[];
}

export interface PurchasedProductList {
  purchasedProductId: number;
  purchasedProductPrice: number;
  purchasedProductBrand: string;
  purchasedProductLogo: string;
  purchasedProductName: string;
  purchasedProductRate: number;
  purchasedProductDetail: string;
  originalProductId: number;
}

export interface IOrderData {
  products_id_list: number[];
}

export interface IOrderDataDelete {
  orderId: number;
}

export const {
  useGetOrderListQuery,
  useAddOrderListMutation,
  useDeleteOrderListMutation,
} = orderApi;
