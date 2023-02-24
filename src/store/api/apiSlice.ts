import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials, logOut } from "../../features/authSlice/authSlice";
import { ax } from '@/libs/axiosClient';
import { getCookieToken } from '@/libs/Cookie';
import { requestToken } from '@/api/authApi';

export const base = fetchBaseQuery({
  baseUrl: 'https://kingtaeyoon.shop/api',
  prepareHeaders: async (headers, { getState }) => {
    const {
      authToken: { accessToken },
    }: any = getState();
    console.log('accessToken', accessToken);
    let token: string;
    if (!accessToken) {
      const refresh = await requestToken(getCookieToken());
      token = refresh.data.accessToken;
    }
    console.log('token', token);
    headers.set(
      'Authorization',
      accessToken ? `Bearer ${accessToken}` : `Bearer ${token}`
    );
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

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
      status: 'FETCH_ERROR';
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
      status: 'PARSING_ERROR';
      originalStatus: number;
      data: string;
      error: string;
    }
  | {
      /**
       * * `"CUSTOM_ERROR"`:
       *   A custom error type that you can return from your `queryFn` where another error might not make sense.
       **/
      status: 'CUSTOM_ERROR';
      data?: unknown;
      error: string;
    };

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kingtaeyoon.shop', // baseUrl 통일예정
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
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

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
