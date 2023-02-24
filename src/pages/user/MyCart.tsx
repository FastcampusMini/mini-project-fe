import { useState, useEffect } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import CartElement from '@components/MyCart/CartElement';
import EmptyCart from '@components/MyCart/EmptyCart';
import Nav from '@/components/Nav';
import { useGetCartQuery, useDeleteCartMutation } from '../../store/api/cartApiSlice';
import { useAddOrderListMutation } from '@/store/api/orderApiSlice';
import SkeletonWishListElement from '@/components/WishList/SkeletonWishListElement';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';

const Mycart = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading, isFetching } = useGetCartQuery('');
  const [deleteCart] = useDeleteCartMutation();
  const [addOrderList] = useAddOrderListMutation();
  const [isValid, setIsValid] = useState(false);
  const [allOrderModal, setAllOrderModal] = useState(false);
  useEffect(() => {
    if (cart?.data?.length !== 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [cart]);
  return (
    <>
      <article className='h-full px-8 pt-8 pb-24 overflow-y-scroll scrollbar-none'>
        <div className='flex justify-between'>
          <Nav left='arrow' />
          <div className='flex gap-4'>
            <CgProfile
              onClick={() => navigate('/user')}
              className='text-3xl cursor-pointer text-gray hover:text-yellow'
            />
            <AiFillHome
              onClick={() => navigate('/main')}
              className='text-3xl cursor-pointer text-gray hover:text-yellow'
            />
          </div>
        </div>
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>장바구니</h1>

        <div className='max-w-screen-sm h-fit'>
          {cart?.data?.map((value: DaumData) => (
            <CartElement
              cartData={value}
              deleteCart={deleteCart}
              addOrderList={addOrderList}
              key={value.basketId}
              allOrderModal={allOrderModal}
              setAllOrderModal={setAllOrderModal}
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
      </article>
      <button
        className={`block text-center text-3xl ${
          isValid ? `bg-yellow` : `bg-gray cursor-not-allowed`
        } text-white py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 absolute w-full left-0`}
        onClick={() => {
          setAllOrderModal(true);
        }}
      >
        총 {cart?.data?.length}개 전체상품 신청하기
      </button>
    </>
  );
};

export default Mycart;
