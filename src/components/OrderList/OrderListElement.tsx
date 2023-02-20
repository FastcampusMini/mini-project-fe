import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import Card from '../MyCart/Card';
import ConfirmModal from '../ui/ConfirmModal';

const OrderListElement = ({ orderData, deleteOrderList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
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
      <div className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg'>
        <div className='flex items-center'>
          <img
            className='w-16'
            src={orderData.purchasedProductList[0].purchasedProductLogo}
            alt='bank_logo'
          />
          <div className='flex flex-col mx-4 gap-1'>
            <h2 className='text-black40 font-semibold'>
              {orderData.purchasedProductList[0].purchasedProductBrand}
            </h2>
            <h3 className='font-bold text-2xl mb-2'>
              {orderData.purchasedProductList[0].purchasedProductName}
            </h3>
          </div>
        </div>
        <div className='flex'>
          <div className='flex items-center gap-3 justify-center font-semibold mx-4 text-lg'>
            <p>처리 준비중</p>
            <button
              onClick={() => {
                setDeleteModal(true);
              }}
              className='w-24 h-9 rounded border-2 border-orange text-sm font-semibold text-orange'
            >
              신청취소
            </button>
          </div>
          <div className='pointer-events-auto flex flex-col items-center'></div>
        </div>
      </div>
    </section>
  );
};

export default OrderListElement;
