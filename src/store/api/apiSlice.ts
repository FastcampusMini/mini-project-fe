import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '@/libs/Cookie';
import { requestToken } from '@/api/authApi';

export const base = fetchBaseQuery({
  baseUrl: 'https://kingtaeyoon.shop/api',
  prepareHeaders: async (headers, { getState }) => {
    const {
      authToken: { accessToken },
    }: any = getState();
    let token: string;
    if (!accessToken) {
      const refresh = await requestToken(getCookieToken());
      token = refresh.data.accessToken;
    }
    headers.set(
      'Authorization',
      accessToken ? `Bearer ${accessToken}` : `Bearer ${token}`,
    );
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
