import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { requestToken } from '@/api/authApi';
import { useSelector } from 'react-redux';
import { SET_TOKEN, DELETE_TOKEN } from '@/features/authSlice/authSlice';
import { getCookieToken, removeCookieToken } from '@/libs/Cookie';
import { useDispatch } from 'react-redux';

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const dispatch = useDispatch();

  const refreshToken = getCookieToken();
  const { authenticated, accessToken, expireTime } = useSelector((state: any) => state.authToken);

  if (refreshToken && new Date().getTime() < expireTime) {
    const response = await requestToken(refreshToken);
    if (response.code === 200) {
      const accessToken = response.data.accessToken;
      dispatch(SET_TOKEN(accessToken));
      // cogoToast.info(response.message);
    } else {
      dispatch(DELETE_TOKEN());
      removeCookieToken();
      // cogoToast.info(response.message);
    }
  }

  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
};

const onRequestError = (error: AxiosError) => {
  removeCookieToken();
};

export { onRequest, onRequestError };
