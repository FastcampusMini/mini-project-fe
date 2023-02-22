import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';

const useGetOrders = (accessToken, options?) => {
  return useQuery<IGetOrders>(['orders'], () => ax.getOrders(accessToken), {
    ...options,
  });
};

export default useGetOrders;
