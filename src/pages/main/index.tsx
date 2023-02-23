import React, { useEffect, useRef, useState } from 'react';
import LoanProduct from '@components/LoanProductCard';
import { TotalLoans } from './TotalLoans';
import Nav from '@components/Nav';
import { ax } from '@/libs/axiosClient';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import Confirmed from './_Confirmed';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import useYScroll from '@/libs/hooks/useYScroll';
import { combinePagesContent } from '@/libs/utils';
import Slider from './Slider';

const Main = () => {
  const [dataPack, setDataPack] = useState([]);
  const [recDataPack, setRecDataPack] = useState([]);

  const { accessToken } = useSelector((state: any) => state.authToken); // 토큰가져오기
  // 상품 가져오기
  const {
    isLoading: fetchingProducts,
    fetchNextPage: fetchingNextProductsPage,
  } = useInfiniteQuery(
    ['products', accessToken],
    ({ pageParam = 1 }) => ax.getProducts(accessToken, pageParam),
    {
      getNextPageParam: (lastPage) => {
        try {
          if (!lastPage) return;
          return lastPage.pageNumber < lastPage.totalPages
            ? lastPage.pageNumber + 1
            : undefined;
        } catch (err) {
          throw Error(err);
        }
      },
      onSuccess: (data) => {
        // console.log(data.pages[0].content);
        setDataPack(combinePagesContent(data.pages));
      },
    }
  );
  // 추천 상품 가져오기
  const { isLoading: fetchingRecommends, fetchNextPage: fetchNextRecPage } =
    useInfiniteQuery(
      ['recProducts', accessToken],
      ({ pageParam = 1 }) => ax.getRecommendsProducts(accessToken, pageParam),
      {
        getNextPageParam: (lastPage) => {
          try {
            if (!lastPage) return;
            return lastPage.pageNumber < lastPage.totalPages
              ? lastPage.pageNumber + 1
              : undefined;
          } catch (err) {
            throw Error(err);
          }
        },
        onSuccess: (data) => {
          // console.log(data.pages[0].content);
          setRecDataPack(combinePagesContent(data.pages));
        },
      }
    );
  // 유저 정보가져오기
  const { data: userInfo, isLoading: fetchingUser } = useQuery<IUserInfo>(
    ['user', accessToken],
    () => ax.getUser(accessToken)
  );

  const ref = useRef(null);
  const yScroll = useYScroll(ref);
  useEffect(() => {
    if (yScroll > 0.99 && !fetchingProducts) {
      fetchingNextProductsPage();
      console.log('무한스크롤', yScroll);
    }
  }, [yScroll]);
  const handleTotal = () => {
    console.log('clicked');
  };

  return (
    <>
      <Confirmed />
      <main className='flex flex-col overflow-y-scroll  h-full pb-16' ref={ref}>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 flex flex-col gap-5'>
          {fetchingUser ? (
            <ReactLoading
              className='relative bottom-2 mx-auto my-auto'
              type='spinningBubbles'
              color='#000'
            />
          ) : (
            <TotalLoans userInfo={userInfo} onClick={handleTotal} />
          )}
          <h3 className='mt-3 font-bold text-2xl'>추천상품</h3>
          {recDataPack && (
            <Slider products={recDataPack} fetchNextPage={fetchNextRecPage} />
          )}
          <h3 className='mt-3 font-bold text-2xl'>대출상품</h3>
          {dataPack?.map((product: IProduct) => (
            <LoanProduct key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
