import React, { useEffect, useState } from 'react';
import LoanProduct from '@components/LoanProductCard';
import { TotalLoans } from './TotalLoans';
import FNB from '@components/FNB/index';
import Nav from '@components/Nav';
import { token, ax } from '@/libs/axiosClient';
import { useQuery } from '@tanstack/react-query';

import SkeletonLoanProductCard from '@/components/SkeletonLoanProductCard';
import { useLocation, useParams } from 'react-router-dom';
import Confirmed from './_Confirmed';
import useGetProducts from '../../libs/hooks/useGetProducts';
import useToken from '@/libs/hooks/useToken';
import useGetRecommendProducts from '@/libs/hooks/useGetRecommendsProducts';
import useGetUser from '@/libs/hooks/useGetUser';

interface IProduct {
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: number;
  rate: number;
}
interface IGetProductsReturn {
  code: number;
  data: IProduct[];
  message: string;
}

const Main = () => {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const { accessToken } = useToken(); // 토큰가져오기
  const {
    data,
    isLoading: fetchingRecommends,
    fetchNextPage,
    hasNextPage,
  } = useGetRecommendProducts(accessToken, {
    onSuccess: (data) => {
      let result = [];
      for (let page of data.pages) {
        result = [...result, ...page.content];
      }
      setProducts(result);
    },
  });

  // 유저 정보가져오기
  const { data: userInfo, isLoading: fetchingUser } = useGetUser(accessToken);

  const handleTotal = () => {
    console.log('clicked');
    fetchNextPage();
  };
  console.log(userInfo);
  return (
    <>
      <Confirmed />
      <main className='flex flex-col'>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 space-y-8'>
          {fetchingUser ? (
            <SkeletonLoanProductCard />
          ) : (
            <TotalLoans
              amount={userInfo?.availableAmount}
              onClick={handleTotal}
            />
          )}

          {/* {isLoading && (
            <ReactLoading
              className=''
              type='spokes'
              color='#000'
              height={"5%"}
              width={"5%"}
            />
          )} */}

          {products?.map((product) => (
            <LoanProduct key={product.id} product={product} />
          ))}
          {/* <LoanProduct product={products[0]} /> */}
        </div>
      </main>
    </>
  );
};

export default Main;
