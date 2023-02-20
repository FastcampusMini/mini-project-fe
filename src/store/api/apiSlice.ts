<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../../features/authSlice/authSlice";
=======
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/authSlice/authSlice';
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)

export type FetchBaseQueryError =
  | {
      /**
       * * `number`:
       *   HTTP status code
       */
      status: number;
      data: unknown;
    }
  | {
      /**
       * * `"FETCH_ERROR"`:
       *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
       **/
<<<<<<< HEAD
      status: "FETCH_ERROR";
=======
      status: 'FETCH_ERROR';
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)
      data?: undefined;
      error: string;
    }
  | {
      /**
       * * `"PARSING_ERROR"`:
       *   An error happened during parsing.
       *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
       *   or an error occurred while executing a custom `responseHandler`.
       **/
<<<<<<< HEAD
      status: "PARSING_ERROR";
=======
      status: 'PARSING_ERROR';
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)
      originalStatus: number;
      data: string;
      error: string;
    }
  | {
      /**
       * * `"CUSTOM_ERROR"`:
       *   A custom error type that you can return from your `queryFn` where another error might not make sense.
       **/
<<<<<<< HEAD
      status: "CUSTOM_ERROR";
=======
      status: 'CUSTOM_ERROR';
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)
      data?: unknown;
      error: string;
    };

const baseQuery = fetchBaseQuery({
<<<<<<< HEAD
  baseUrl: "http://localhost:5173", // baseUrl 통일예정
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }
=======
  baseUrl: 'http://localhost:5173', // baseUrl 통일예정
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
<<<<<<< HEAD
  // if (result?.error?.originalStatus === 403) {
  //   console.log("sending refresh token");
  //   // send refresh token to get new access token
  //   const refreshResult = await baseQuery("/refresh", api, extraOptions);
  //   console.log(refreshResult);
  //   if (refreshResult?.data) {
  //     const user = api.getState().auth.user;
  //     // store the new token
  //     api.dispatch(setCredentials({ ...refreshResult.data, user }));
  //     // retry the original query with new access token
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }
=======
  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
>>>>>>> d4a9c5d (Fix: Updata refreshToken expireDate in Cookie.ts)

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
