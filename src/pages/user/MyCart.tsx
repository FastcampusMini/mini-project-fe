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
import SkeletonWishListElement from '@/components/WishList/SkeletonWishListElement';
import { useNavigate } from 'react-router-dom';

const Mycart = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading, isFetching, isError } = useGetCartQuery('');
  const [deleteCart] = useDeleteCartMutation();
  const [addOrderList] = useAddOrderListMutation();
  console.log('cart', cart);
  return (
    <>
      <article>
        <div className='flex justify-between'>
          <Nav left='arrow' />
        </div>
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          장바구니
        </h1>
        <div className='h-[calc(100vh-270px)] scrollbar pr-5 scrollbar-thumb-black/20 scrollbar-track-black/20 overflow-y-scroll scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          <div className='max-w-screen-sm h-fit'>
            {cart?.data?.map((value: Daum) => (
              <CartElement
                cartData={value}
                deleteCart={deleteCart}
                addOrderList={addOrderList}
                key={value.basketId}
              />
            ))}
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
            {(isLoading || isFetching) && <SkeletonWishListElement />}
          </div>
        </div>
      </article>
      <Navigation />
      {isError && navigate('/signin')}
    </>
  );
};

export default Mycart;
