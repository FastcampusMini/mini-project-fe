import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ax } from '../axiosClient';
import { combinePagesContent } from '../utils';

const useGetRecommendProducts = (accessToken, options?) => {
  const [dataPack, setDataPack] = useState([]);
  return useInfiniteQuery(
    ['products'],
    ({ pageParam = 1 }) => ax.getRecommendsProducts(accessToken, pageParam),
    Object.assign(
      {
        getNextPageParam: (lastPage, allPages) => {
          try {
            if (!lastPage) return;
            if (lastPage?.pageNumber >= lastPage.totalPages) return;
            return lastPage.pageNumber + 1;
          } catch (err) {
            throw Error(err);
          }
        },
        onSuccess: (data) => {
          setDataPack(combinePagesContent(data.pages));
        },
      },
      options
    )
  );
};

export default useGetRecommendProducts;
