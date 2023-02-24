import { removeCookieToken } from '@/libs/Cookie';
import axios from 'axios';
// import { onRequest, onRequestError } from '../libs/refresh';

export const instance = axios.create({
  baseURL: 'https://kingtaeyoon.shop/',
  // timeout: 2500,
  headers: {
    'Content-type': 'application/json',
  },
});

// instance.interceptors.request.use(onRequest, onRequestError);
