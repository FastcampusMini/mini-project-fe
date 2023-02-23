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
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const navigate = useNavigate();
  const {
    data: wishlist,
    isLoading,
    isFetching,
    isError,
  } = useGetWishListQuery('');
  console.log('data', wishlist);
  const [deleteWishList] = useDeleteWishListMutation();
  const [addCart] = useAddCartMutation();
  return (
    <>
      <article>
        <Nav left='arrow' />
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          관심상품
        </h1>
        <div className='h-[calc(100vh-270px)] scrollbar pr-6 scrollbar-thumb-black/20 scrollbar-track-black/20 overflow-y-scroll scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          <div className='max-w-screen-sm h-fit'>
            {wishlist?.data?.map((value: DaumData) => (
              <WishListElement
                wishlistData={value}
                addCart={addCart}
                deleteWishList={deleteWishList}
                key={value.wishlistId}
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
        </div>
      </article>
      <Navigation />
      {isError && navigate('/signin')}
    </>
  );
};

export default WishList;
