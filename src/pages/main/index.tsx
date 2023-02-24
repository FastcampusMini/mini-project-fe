import React, { useEffect, useRef, useState } from 'react';
import LoanProductCard from '@components/LoanProductCard';
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
import { MdChecklistRtl, MdOutlineAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import SkeletonLoanProductCard from '@/components/SkeletonLoanProductCard';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import Checkbox from '@/components/Checkbox';

const Main = () => {
  const [loanProducts, setLoanProducts] = useState([]);
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const { accessToken } = useSelector((state: any) => state.authToken); // 토큰가져오기
  // 상품 가져오기
  const {
    data: loanProductsPages,
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
        console.log(data);
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
          if (!data.pages) console.log('data가없어요', data.pages);
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
  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <>
      {fetchingUser && (
        <ReactLoading
          className='absolute bottom-2 mx-auto my-auto left-1/2 top-1/2'
          type='spinningBubbles'
          color='#000'
        />
      )}
      <BsFillArrowUpSquareFill
        className='absolute right-10 bottom-6 z-30 text-black/20 cursor-pointer transition-colors hover:text-black/50 hover:scale-110'
        size={40}
        onClick={scrollToTop}
      />
      <main
        className='flex flex-col overflow-y-scroll  h-full pb-16 relative'
        ref={ref}>
        <Nav left='arrow' right='arrow' addClass='mt-5' />
        <div className='flex justify-between px-10 mb-5'>
          <div className=''>
            <h1 className='font-bold text-4xl  pointer-events-none'>
              Let's Get a Loan!
            </h1>
            <p className='text-black60  pointer-events-none'>
              대출자격은 더 <strong>넓게!</strong> 금리는 더{' '}
              <strong>낮게!</strong>
            </p>
            <p className='mt-4 text-lg text-black60 font-semibold  pointer-events-none'>
              {userInfo?.name ? userInfo?.name : '(익명)'}님 대출 가능한 금액 :{' '}
              <strong className='text-black80'>
                {userInfo?.availableAmount}
              </strong>
              만 원
            </p>
          </div>
          <div className='space-y-2 flex flex-col items-end'>
            <span className='text-black40 text-sm font-semibold pointer-events-none'>
              {userInfo?.email}
            </span>
            <div className='flex gap-3'>
              <MdOutlineAccountCircle
                onClick={() => navigate('/user')}
                size={30}
                className='rounded-2xl p-1 box-content bg-black/5 transition-all cursor-pointer hover:bg-black/10'
              />
              <AiOutlineShoppingCart
                onClick={() => navigate('/user/mycart')}
                size={30}
                className='rounded-2xl p-1 box-content bg-black/5 transition-all cursor-pointer hover:bg-black/10'
              />
              <MdChecklistRtl
                onClick={() => navigate('/user/wishlist')}
                size={30}
                className='rounded-2xl p-1 box-content bg-black/5 transition-all cursor-pointer hover:bg-black/10'
              />
            </div>
          </div>
        </div>
        <div className='bg-yellow w-full h-96 absolute -z-40'>{/*배경 */}</div>
        <h3 className='my-3 font-bold text-2xl mx-10  pointer-events-none'>
          추천상품
        </h3>
        <div className='flex flex-col gap-5'>
          {!!recommendedProducts.length && (
            <Slider
              products={recommendedProducts}
              fetchNextPage={fetchNextRecPage}
            />
          )}

          <div className='mx-10'>
            <h3 className='my-3 font-bold text-2xl  pointer-events-none'>
              대출상품
            </h3>

            <div className='grid grid-cols-2 gap-5 '>
              {/* {loanProducts?.map((product: IProduct) => (
                <LoanProductCard key={product?.productId} product={product} />
              ))} */}
              {/* {loanProductsPages.pages.map((page) =>
                page.content.map((product) => (
                  <LoanProductCard key={product?.productId} product={product} />
                ))
              )} */}
              {/* <LoanProductCard product={loanProducts[0]} /> */}
              {/* {[1, 2, 3, 4, 5, 6].map((dummy) => (
                <SkeletonLoanProductCard key={dummy + 'dummy'} />
              ))} */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
