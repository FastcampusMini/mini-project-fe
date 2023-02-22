import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';
/** 주문목록을 가져옵니다.
 * [사용예시]
 * const { data, isLoading, refetch } = useGetOrder(accessToken);
 */
const useGetOrders = (accessToken, options?) => {
  if (!accessToken) {
    console.log('accessToken이 없습니다');
    return;
  }
  return useQuery<IGetOrders>(['orders'], () => ax.getOrders(accessToken), {
    ...options,
  });
};

export default useGetOrders;
