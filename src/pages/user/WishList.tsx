import WishListElement from '../../components/WishList/WishListElement';
import { FaHeartBroken } from 'react-icons/fa';
import EmptyCart from './../../components/MyCart/EmptyCart';
import Nav from '@/components/Nav';
import {
  useGetWishListQuery,
  useDeleteWishListMutation,
} from '@/store/api/wishlistApiSlice';
import { useAddCartMutation } from '@/store/api/cartApiSlice';
import Navigation from '@components/ui/Navigation';
import SkeletonWishListElement from '@/components/WishList/SkeletonWishListElement';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';

const WishList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: wishlist, isLoading, isFetching } = useGetWishListQuery('');
  const [deleteWishList] = useDeleteWishListMutation();
  const [addCart] = useAddCartMutation();
  return (
    <>
      <article className='h-full px-10 pt-8 pb-24 overflow-y-scroll scrollbar-none'>
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
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          관심상품
        </h1>
        <div className='max-w-screen-sm h-fit'>
          {wishlist?.data?.map((value: DaumData) => (
            <WishListElement
              wishlistData={value}
              addCart={addCart}
              deleteWishList={deleteWishList}
              key={value.productId}
            />
          ))}
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
          {(isLoading || isFetching) && <SkeletonWishListElement />}
        </div>
      </article>
      <Navigation pathname={pathname} />
    </>
  );
};

export default WishList;
