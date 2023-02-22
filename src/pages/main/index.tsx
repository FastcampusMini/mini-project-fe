import React, { useEffect, useState } from 'react';
import LoanProduct from '@components/LoanProductCard';
import { TotalLoans } from './TotalLoans';
import FNB from '@components/FNB/index';
import Nav from '@components/Nav';
import { ax } from '@/libs/axiosClient';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import SkeletonLoanProductCard from '@/components/SkeletonLoanProductCard';
import { useLocation, useParams } from 'react-router-dom';
import Confirmed from './_Confirmed';
import useGetProducts from '../../libs/hooks/useGetProducts';
import useToken from '@/libs/hooks/useToken';
import useGetRecommendProducts from '@/libs/hooks/useGetRecommendsProducts';
import useGetUser from '@/libs/hooks/useGetUser';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

const Main = () => {
  const [products, setProducts] = useState([]);
  const { accessToken } = useSelector((state: any) => state.authToken);
  // const { accessToken } = useToken(); // 토큰가져오기
  // const { data, fetchNextPage } = useInfiniteQuery(
  //   [products],
  //   ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
  //   {
  //     getNextPageParam: (lastPage) => 2,
  //     onSuccess: (data) => console.log('테스트onSucc ', data),
  //   }
  // );
  const {
    isLoading: fetchingRecommends,
    fetchNextPage,
    dataPack,
  } = useGetProducts(accessToken, {
    // onSuccess: (data) => {
    //   console.log(data);
    //   let result = [];
    //   for (let page of data.pages) {
    //     result = [...result, ...page?.content];
    //   }
    //   setProducts(result);
    // },
  });

  // 유저 정보가져오기
  const { data: userInfo, isLoading: fetchingUser } = useGetUser(accessToken);

  const handleTotal = () => {
    console.log('clicked');
    fetchNextPage();
  };

  return (
    <>
      <Confirmed />
      <main className='flex flex-col'>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 flex flex-col gap-5'>
          {fetchingUser ? (
            <ReactLoading
              className='relative bottom-2 mx-auto my-auto'
              type='spinningBubbles'
              color='#000'
            />
          ) : (
            // <SkeletonLoanProductCard />
            <TotalLoans userInfo={userInfo} onClick={handleTotal} />
          )}

          {dataPack?.map((product: IProduct) => (
            <LoanProduct key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
