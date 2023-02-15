import React from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import CartElement from '../../components/MyCart/CartElement';
import EmptyCart from '../../components/MyCart/EmptyCart';
import Back from '../../components/ui/Navigation/Back';

const Mycart = () => {
  return (
    <article>
      <Back />
      <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>장바구니</h1>
      <EmptyCart>
        <MdOutlineShoppingCart className='text-7xl' />
        <p className='text-center font-extrabold text-lg'>
          장바구니에
          <br />
          담긴 상품이 없습니다.
        </p>
      </EmptyCart>
      {/* {[1, 2, 3].map((data, i) => (
        <CartElement key={i} />
      ))} */}
    </article>
  );
};

export default Mycart;
