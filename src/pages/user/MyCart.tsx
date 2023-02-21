import { MdOutlineShoppingCart } from 'react-icons/md';
import CartElement from '@components/MyCart/CartElement';
import EmptyCart from '@components/MyCart/EmptyCart';
import Nav from '@/components/Nav';
import {
  useGetCartQuery,
  useDeleteCartMutation,
} from '../../store/api/cartApiSlice';
import { useAddOrderListMutation } from '@/store/api/orderApiSlice';
import Navigation from '@components/ui/Navigation';
import SkeletonCartElement from '@/components/MyCart/SkeletonCartElement';

const Mycart = () => {
  const { data: cart, isLoading, isFetching } = useGetCartQuery('');
  const [deleteCart] = useDeleteCartMutation();
  const [addOrderList] = useAddOrderListMutation();
  console.log('cart', cart);
  return (
    <>
      <article>
        <Nav left='arrow' />
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
        {cart?.data?.map((value: Daum) => (
          <CartElement
            cartData={value}
            deleteCart={deleteCart}
            addOrderList={addOrderList}
            key={value.basketId}
          />
        ))}
        {(isLoading || isFetching) && <SkeletonCartElement />}
      </article>
      <Navigation type='scroll' />
    </>
  );
};

export default Mycart;
