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

const OrderList = () => {
  const {
    data: order,
    isLoading,
    isFetching,
    isError,
  } = useGetOrderListQuery('');
  const [deleteOrderList] = useDeleteOrderListMutation();
  console.log('order', order);
  return (
    <>
      <article>
        <Nav left='arrow' />
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          신청 내역
        </h1>
        {order?.data === null ? (
          <EmptyCart>
            <AiOutlineFileSearch className='text-7xl' />
            <p className='text-center font-extrabold text-lg'>
              신청내역이 없습니다.
            </p>
          </EmptyCart>
        ) : null}
        <div className='h-[calc(100vh-270px)] scrollbar pr-8 scrollbar-thumb-black/20 scrollbar-track-black/20 overflow-y-scroll scrollbar-thumb-rounded-md scrollbar-track-rounded-md'>
          <div className='max-w-screen-sm h-fit'>
            {order?.data?.map((value) => (
              <OrderListElement
                orderData={value}
                key={value.orderId}
                deleteOrderList={deleteOrderList}
              />
            ))}
            {(isLoading || isFetching || isError) && (
              <SkeletonOrderListElement />
            )}
          </div>
        </div>
      </article>
      <Navigation />
    </>
  );
};

export default OrderList;
