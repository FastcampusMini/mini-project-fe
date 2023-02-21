import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ax } from '../axiosClient';
import { combinePagesContent } from '../utils';

const useGetProducts = (accessToken, options?) => {
  const [dataPack, setDataPack] = useState([]);
  const result = useInfiniteQuery(
    ['products', accessToken],
    ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
    Object.assign(
      {
        getNextPageParam: (lastPage, allPages) => {
          try {
            if (!lastPage) return;
            if (lastPage.pageNumber === lastPage.totalPages) return;
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
  return { ...result, dataPack };
};

export default useGetProducts;
