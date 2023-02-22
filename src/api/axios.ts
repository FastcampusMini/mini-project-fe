import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://43.200.194.5:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

// axios.defaults.withCredentials = true;
