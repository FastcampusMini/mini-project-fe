import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://52.78.32.230:8080',
  headers: {
    'Content-type': 'application/json',
    Accept: '*/*',
  },
});
