import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';

const useGetProducts = (accessToken, options?) => {
  console.log('useGetProducts 실행');
  return useInfiniteQuery(
    ['products'],
    ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
    Object.assign(
      {
        getNextPageParam: (lastPage, allPages) => {
          try {
            console.log('lastPage', lastPage);
            console.log('allpages', allPages);
            // if (lastPage.pageNumber === lastPage.totalPages) return;
            // return lastPage.pageNumber + 1;
          } catch (err) {
            throw Error(err);
          }
        },
      },
      options
    )
  );
};

export default useGetProducts;
