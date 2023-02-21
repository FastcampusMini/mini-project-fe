import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';
import useToken from './useToken';

const useGetUser = (accessToken, options?) => {
  return useQuery<IUserInfo>(['user'], () => ax.getUser(accessToken), {
    ...options,
  });
};

export default useGetUser;
