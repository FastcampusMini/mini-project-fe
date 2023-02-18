import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://52.78.32.230:8080',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set(
      'Authorization',
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2NjU5NDQyLCJleHAiOjE2NzY2NjEyNDIsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.w_e5iZ93HhVAujU-ZppgB01PYWk6oNV4R3RC9Lnsxic`,
    );
    headers.set('Content-Type', 'application/json');
    console.log('headers', headers);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
