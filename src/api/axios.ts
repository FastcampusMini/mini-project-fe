import { removeCookieToken } from '@/libs/Cookie';
import axios from 'axios';
// import { onRequest, onRequestError } from '../libs/refresh';

export const instance = axios.create({
  baseURL: 'http://43.200.194.5:8080',
  // timeout: 2500,
  headers: {
    'Content-type': 'application/json',
  },
});

// instance.interceptors.request.use(onRequest, onRequestError);
