import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from '@/libs/Cookie';
import { ax } from '@/libs/axiosClient';

export const base = fetchBaseQuery({
  baseUrl: 'https://asia-northeast3-loantech-7603b.cloudfunctions.net/api',
  prepareHeaders: async (headers, { getState }) => {
    const {
      authToken: { accessToken },
    }: any = getState();
    let token: string;
    if (!accessToken) {
      const refresh = await ax.postRefresh(getCookieToken());
      token = refresh.data.accessToken;
    }
    headers.set(
      'Authorization',
      accessToken ? `Bearer ${accessToken}` : `Bearer ${token}`
    );
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
