import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://0eb87ea2-bcc1-4cc1-afba-27bb8eb62c64.mock.pstmn.io",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<ICartApi, String>({
      query: () => "/basket2",
      providesTags: ["Cart"],
    }),
    // setCart: builder.mutation({
    //   query: ({ name, value }) => {
    //     return {
    //       url: `count/${name}`,
    //       method: "POST",
    //       body: { value }
    //     };
    //   },
    //   invalidatesTags: (result, error, arg) => [{ type: "Cart", id: arg.name }]
    // })
  }),
});

export interface ICartApi {
  code: number;
  message: string;
  output: Output[];
}

export interface Output {
  basketId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  rate: string;
  phone: string;
  datail: string;
  price: string;
}

export const { useGetCartQuery } = cartApi;
