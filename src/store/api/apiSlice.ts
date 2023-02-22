import { useSelector } from 'react-redux';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
// import { setCredentials, logOut } from "../../features/authSlice/authSlice";
import store from './../store';

export const base = fetchBaseQuery({
  baseUrl: 'http://43.200.194.5:8080/api',
  prepareHeaders: (headers, getState) => {
    // const { accessToken } = useSelector((state: any) => state.authToken);
    // /refresh를 이용해 cookie에 있는 refreshtoken으로 accesstoken 재발급
    // 이 accesstoken으로 함수 실행
    // 만약 refreshtoken도 만료됐다면 다시 로그인하도록
    const token = store.getState().authToken;
    console.log(token);
    headers.set(
      'Authorization',
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc3MDc1NjUzLCJleHAiOjE2NzcwNzc0NTMsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.ucpM1CUGvL9yz84mItRmCUlXkm9KBkMVOO7HY4GNBdI`,
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
  baseUrl: 'http://43.200.194.5:8080', // baseUrl 통일예정
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
