import { AiOutlineFileSearch } from 'react-icons/ai';
import EmptyCart from '../../components/MyCart/EmptyCart';
import Nav from '@/components/Nav';
import OrderListElement from './../../components/OrderList/OrderListElement';
import {
  useDeleteOrderListMutation,
  useGetOrderListQuery,
} from '@/store/api/orderApiSlice';
import Navigation from '@components/ui/Navigation';
import SkeletonOrderListElement from '@/components/OrderList/SkeletonOrderListElement';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';

const OrderList = () => {
  const navigate = useNavigate();
  const {
    data: order,
    isLoading,
    isFetching,
    isError,
  } = useGetOrderListQuery('');
  const [deleteOrderList] = useDeleteOrderListMutation();
  return (
    <>
      <article className='p-8'>
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
          신청 내역
        </h1>
        <div className='h-[calc(100vh-270px)] scrollbar pr-6 scrollbar-thumb-black/20 scrollbar-track-black/20 overflow-y-scroll scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          <div className='max-w-screen-sm h-fit'>
            {order?.data?.map((value) => (
              <OrderListElement
                orderData={value}
                key={value.orderId}
                deleteOrderList={deleteOrderList}
              />
            ))}
            {order?.data === null ? (
              <EmptyCart>
                <AiOutlineFileSearch className='text-7xl' />
                <p className='text-center font-extrabold text-lg'>
                  신청내역이 없습니다.
                </p>
              </EmptyCart>
            ) : null}
            {(isLoading || isFetching) && <SkeletonOrderListElement />}
          </div>
        </div>
      </article>
      <Navigation />
      {isError && navigate('/')}
    </>
  );
};

export default OrderList;
