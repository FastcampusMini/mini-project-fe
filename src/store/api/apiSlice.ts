import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials, logOut } from "../../features/authSlice/authSlice";

export const base = fetchBaseQuery({
  baseUrl: 'http://52.78.32.230:8080/api',
  prepareHeaders: (headers) => {
    // 나중에 cookie에서 가져오는걸로 변경하기
    headers.set(
      'Authorization',
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODk4MjIyLCJleHAiOjE2NzY5MDAwMjIsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.FvaUKKH13pzWR1F4ueVfzEQwRNU7HYgHmcQUHozjXzk`,
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
  baseUrl: 'http://localhost:5173', // baseUrl 통일예정
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
