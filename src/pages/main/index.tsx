import React, { useEffect, useRef, useState } from 'react';
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
import { useScroll } from 'framer-motion';
import useYScroll from '@/libs/hooks/useYScroll';
import { combinePagesContent } from '@/libs/utils';

const Main = () => {
  const [dataPack, setDataPack] = useState([]);
  const { accessToken } = useSelector((state: any) => state.authToken); // 토큰가져오기

  // const { data, fetchNextPage } = useInfiniteQuery(
  //   [products],
  //   ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
  //   {
  //     getNextPageParam: (lastPage) => 2,
  //     onSuccess: (data) => console.log('테스트onSucc ', data),
  //   }
  // );
  const { isLoading: fetchingRecommends, fetchNextPage } = useInfiniteQuery(
    ['products', accessToken],
    ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
    {
      getNextPageParam: (lastPage) => {
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
    }
  );

  // 유저 정보가져오기
  const { data: userInfo, isLoading: fetchingUser } = useQuery<IUserInfo>(['user', accessToken], () =>
    ax.getUser(accessToken)
  );

  const ref = useRef();
  const yScroll = useYScroll(ref);
  useEffect(() => {
    console.log(yScroll);
  }, [yScroll]);
  const handleTotal = () => {
    console.log('clicked');

    // fetchNextPage();
  };
  return (
    <>
      <Confirmed />
      <main
        className='flex flex-col overflow-y-scroll'
        ref={ref}
        onClick={() => {
          console.log(yScroll);
        }}
      >
        <Nav left='arrow' right='arrow' />
        <div className='px-3 flex flex-col gap-5'>
          {fetchingUser ? (
            <ReactLoading className='relative bottom-2 mx-auto my-auto' type='spinningBubbles' color='#000' />
          ) : (
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
