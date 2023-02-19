import { createApi } from '@reduxjs/toolkit/query/react';
import { base } from './apiSlice';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: base,
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
