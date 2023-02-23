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
import SlideCard from './SlideCard';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Main = () => {
  const [loanProducts, setLoanProducts] = useState([]);
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

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
        // combinePagesContent : data.pages 페이지안에서 content 배열을 하나로 합쳐서 반환한다.
        // 그 반환값을 loanProducts 상태에 저장한다.
        setLoanProducts(combinePagesContent(data.pages));
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
          setRecommendedProducts(combinePagesContent(data.pages));
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

  return (
    <>
      {fetchingUser && (
        <ReactLoading
          className='relative bottom-2 mx-auto my-auto'
          type='spinningBubbles'
          color='#000'
        />
      )}
      <main
        className='flex flex-col overflow-y-scroll  h-full pb-16 relative'
        ref={ref}>
        <Nav left='arrow' right='arrow' addClass='mt-5' />
        <div className='flex justify-between px-10 mb-5'>
          <div className=''>
            <h1 className='font-bold text-4xl'>Let's Get a Loan!</h1>
            <p className='text-black60'>
              대출자격은 더 <strong>넓게!</strong> 금리는 더{' '}
              <strong>낮게!</strong>
            </p>
            <p className='mt-4 text-lg text-black60 font-semibold'>
              대출 가능 :{' '}
              <strong className='text-black80'>
                {userInfo?.availableAmount}
              </strong>
              만 원
            </p>
          </div>

          <div className='flex gap-3'>
            <MdOutlineAccountCircle
              onClick={() => navigate('/user')}
              size={40}
              className='rounded-2xl p-1 box-content bg-black/5 transition-all cursor-pointer hover:bg-black/10'
            />
            <AiOutlineShoppingCart
              onClick={() => navigate('/user/mycart')}
              size={40}
              className='rounded-2xl p-1 box-content bg-black/5 transition-all cursor-pointer hover:bg-black/10'
            />
          </div>
        </div>
        <div className='bg-yellow w-[640px] h-96 absolute -z-40'>
          {/*배경 */}
        </div>
        <div className='flex flex-col gap-5'>
          {recommendedProducts && (
            <Slider
              products={recommendedProducts}
              fetchNextPage={fetchNextRecPage}
            />
          )}
          <div className='mx-10'>
            <h3 className='my-3 font-bold text-2xl'>대출상품</h3>
            {loanProducts?.map((product: IProduct) => (
              <LoanProduct key={product?.productId} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;