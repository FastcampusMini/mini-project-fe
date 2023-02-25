import { useState } from 'react';
import ConfirmModal from '../ui/ConfirmModal';
import OrderListCard from './OrderListCard';

const OrderListElement = ({ orderData, deleteOrderList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <div className='flex justify-between items-center mb-2'>
        <div className='ml-2 mb-2 text-lg font-bold'>
          {orderData.purchaseDate[0]}. {orderData.purchaseDate[1]}.{' '}
          {orderData.purchaseDate[2]} 주문
        </div>
        <button
          onClick={() => {
            setDeleteModal(true);
          }}
          className='w-24 h-9 rounded border-2 border-orange text-sm font-semibold text-orange'
        >
          신청취소
        </button>
      </div>
      <div className='flex flex-col gap-3'>
        {orderData?.purchasedProductList?.map((value: PurchasedProductList) => (
          <OrderListCard orderList={value} key={value.purchasedProductId} />
        ))}
      </div>
      {deleteModal && (
        <ConfirmModal
          title='신청취소 하시겠습니까?'
          description=''
          onConfirm={async () => {
            await deleteOrderList({ orderId: orderData.orderId });
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </section>
  );
};

export default OrderListElement;
