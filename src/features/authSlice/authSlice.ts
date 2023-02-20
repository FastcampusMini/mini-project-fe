import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type authState = {
  authenticated: boolean; // 현재 로그인 여부 확인
  accessToken: string | undefined; // Access Token 저장
  expireTime: number; //Access Token 만료시간
};

const initialState: authState = {
  authenticated: false,
  accessToken: null,
  expireTime: null,
};

export const TOKEN_TIME_OUT = 60 * 30;

export const authSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      // Access Token 정보를 저장
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      // Access Token에 대한 정보 삭제
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;

export default authSlice.reducer;
