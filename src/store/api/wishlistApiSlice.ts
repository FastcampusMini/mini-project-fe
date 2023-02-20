import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base } from "./origin_apiSlice";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: base,
  tagTypes: ["WishList"],
  endpoints: (builder) => ({
    getWishList: builder.query<IWishList, String>({
      query: () => "/wishlists",
      providesTags: ["WishList"],
    }),
    addWishList: builder.mutation({
      query: (wishListData: IWishListData) => {
        return {
          url: "/wishlists",
          method: "POST",
          body: wishListData,
        };
      },
      invalidatesTags: ["WishList"],
    }),
    deleteWishList: builder.mutation({
      query: (wishListData: IWishListDataDelete) => ({
        url: "/wishlists",
        method: "DELETE",
        body: wishListData,
      }),
      invalidatesTags: ["WishList"],
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
