import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import EmptyCart from '../../components/MyCart/EmptyCart';
import Back from '../../components/ui/Navigation/Back';
import OrderListElement from './../../components/OrderList/OrderListElement';
import { useGetOrderListQuery } from '@/store/api/orderApiSlice';

const OrderList = () => {
  const { data: order, isLoading } = useGetOrderListQuery('');
  console.log('order', order);
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <article>
      <Back />
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
      {order?.data?.map((value, i: number) => (
        <OrderListElement orderData={value} key={i} />
      ))}
    </article>
  );
};

export default OrderList;
