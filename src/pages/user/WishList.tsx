import React from 'react';
import WishListElement from '../../components/WishList/WishListElement';
import { FaHeartBroken } from 'react-icons/fa';
import EmptyCart from './../../components/MyCart/EmptyCart';
import Back from '../../components/ui/Navigation/Back';

const WishList = () => {
  return (
    <article>
      <Back />
      <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>관심상품</h1>
      <EmptyCart>
        <FaHeartBroken className='text-7xl' />
        <p className='flex flex-col gap-3 text-center font-extrabold text-lg'>
          관심 상품이 비어있네요!
          <br />
          <span className='text-sm'>
            원하는 상품의 하트아이콘을 <br /> 눌러 관심상품 리스트를 만들어보세요.
          </span>
        </p>
      </EmptyCart>
      {/* {[1, 2, 3].map((data, i) => (
        <WishListElement key={i} />
      ))} */}
    </article>
  );
};

export default WishList;
