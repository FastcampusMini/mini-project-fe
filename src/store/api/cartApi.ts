import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    // baseUrl 변경
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Data[] => ICart로 변경하기
    getCart: builder.query<Data[], String>({
      query: () => "/basket",
      providesTags: ["Cart"],
    }),
    addCart: builder.mutation({
      // cartData도 아마? productsId를 받는 것 같다. 어차피 다 다시 작성해야함..
      query: (cartData: Data) => {
        return {
          // /basket/add 로 변경하기
          url: "/basket",
          method: "POST",
          body: cartData,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id: number) => ({
        url: `/basket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// 나중에 추가되는 데이터 있을 예정이니 다시 작성하기
export interface ICart {
  code: number;
  message: string;
  data: Data[];
}

export interface Data {
  basketId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  rate: string;
  phone: string;
  datail: string;
  price: string;
  img: string;
}

export const { useGetCartQuery, useAddCartMutation, useDeleteCartMutation } =
  cartApi;
