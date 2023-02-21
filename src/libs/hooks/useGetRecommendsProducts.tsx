import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';

const useGetRecommendProducts = (accessToken, options?) => {
  return useInfiniteQuery(
    ['products'],
    ({ pageParam = 1 }) => ax.getRecommendsProducts(accessToken, pageParam),
    Object.assign(
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.pageNumber >= lastPage.totalPages) return;
          return lastPage.pageNumber + 1;
        },
      },
      options
    )
  );
};

export default useGetRecommendProducts;
