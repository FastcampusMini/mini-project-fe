import { useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import CartElement from '@components/MyCart/CartElement';
import EmptyCart from '@components/MyCart/EmptyCart';
import Back from '@components/ui/Navigation/Back';
import {
  cartApi,
  useGetCartQuery,
  useDeleteCartMutation,
} from '../../store/api/cartApiSlice';
import ConfirmModal from './../../components/ui/ConfirmModal';

console.log('api', cartApi);
const Mycart = () => {
  const { data: cart, isLoading } = useGetCartQuery('');
  console.log('cart', cart);
  const [deleteCart] = useDeleteCartMutation();

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <article>
        <Back />
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          장바구니
        </h1>
        {cart?.data?.length === 0 ? (
          <EmptyCart>
            <MdOutlineShoppingCart className='text-7xl' />
            <p className='text-center font-extrabold text-lg'>
              장바구니에
              <br />
              담긴 상품이 없습니다.
            </p>
          </EmptyCart>
        ) : null}
        {/* key 값 변경하기 */}
        {cart?.data?.map((value: ICart, i: number) => (
          <CartElement cartData={value} deleteCart={deleteCart} key={i} />
        ))}
      </article>
    </>
  );
};

export interface ICart {
  basketId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  price: number;
}

export default Mycart;
