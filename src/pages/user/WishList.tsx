import React from 'react';
import WishListElement from '../../components/WishList/WishListElement';
import { FaHeartBroken } from 'react-icons/fa';
import EmptyCart from './../../components/MyCart/EmptyCart';
import Back from '../../components/ui/Navigation/Back';
import {
  useGetWishListQuery,
  useDeleteWishListMutation,
} from '@/store/api/wishlistApiSlice';
import { useAddBasketInWishListMutation } from '@/store/api/cartApiSlice';

const WishList = () => {
  const { data: wishlist, isLoading } = useGetWishListQuery('');
  const [addBasketInWishList] = useAddBasketInWishListMutation();
  const [deleteWishList] = useDeleteWishListMutation();
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <article>
      <Back />
      <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
        관심상품
      </h1>
      {wishlist?.data?.length === 0 ? (
        <EmptyCart>
          <FaHeartBroken className='text-7xl' />
          <p className='flex flex-col gap-3 text-center font-extrabold text-lg'>
            관심 상품이 비어있네요!
            <br />
            <span className='text-sm'>
              원하는 상품의 하트아이콘을 <br /> 눌러 관심상품 리스트를
              만들어보세요.
            </span>
          </p>
        </EmptyCart>
      ) : null}

      {wishlist?.data?.map((value, i: number) => (
        <WishListElement
          wishlistData={value}
          addBasketInWishList={addBasketInWishList}
          deleteWishList={deleteWishList}
          key={i}
        />
      ))}
    </article>
  );
};

export default WishList;
