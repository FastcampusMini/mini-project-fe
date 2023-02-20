import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const base = fetchBaseQuery({
  baseUrl: "http://52.78.32.230:8080/api",
  prepareHeaders: (headers) => {
    // 나중에 cookie에서 가져오는걸로 변경하기
    headers.set(
      "Authorization",
      `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2ODE2NTY0LCJleHAiOjE2NzY4MTgzNjQsImVtYWlsIjoibmlrZUBuYXZlci5jb20ifQ.4PKFyMBGJM42QkTKAcfsr6sha_wfPuoZT20jlrfQzTo`
    );
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
