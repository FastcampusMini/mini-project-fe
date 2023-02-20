import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import Card from './Card';
import ConfirmModal from '../ui/ConfirmModal';
import { useGetOrderListQuery } from '@/store/api/orderApiSlice';
import AlertModal from '../ui/AlertModal';

// key 값 변경 될 수도 있음
const CartElement = ({ cartData, deleteCart, addOrderList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const { data: order } = useGetOrderListQuery('');
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      {deleteModal && (
        <ConfirmModal
          title='삭제하시겠습니까?'
          description=''
          onConfirm={async () => {
            await deleteCart({ basketId: cartData.basketId });
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
      {addModal && (
        <ConfirmModal
          title='신청하시겠습니까?'
          description=''
          onConfirm={async () => {
            const find = order?.data?.find((value) => {
              return (
                value.purchasedProductList[0].originalProductId ===
                cartData.productId
              );
            });
            if (find) {
              setAddModal(false);
              setAlertModal(true);
            } else {
              await addOrderList({ products_id_list: [cartData.productId] });
              await deleteCart({ basketId: cartData.basketId });
              setAddModal(false);
            }
          }}
          onCancel={() => setAddModal(false)}
        />
      )}
      {alertModal && <AlertModal setAlertModal={setAlertModal} />}
      <Card data={cartData}>
        <div className='flex'>
          <div className='flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg'>
            <span>최저 1.5%</span>
            <span>{cartData.price}만원</span>
          </div>
          <div className='pointer-events-auto'>
            <TiDeleteOutline
              onClick={() => {
                setDeleteModal(true);
              }}
              className='text-4xl text-[#E5E7EB] font-light cursor-pointer'
            />
          </div>
        </div>
      </Card>
      <div className='flex items-center justify-between px-3 py-1 border border-t-0 border-black5 rounded-b-lg bg-[#f3f3f3] '>
        <p className='font-semibold text-black60'>
          청년만 가입할수 있는 적금입니다.
        </p>
        <button
          onClick={() => {
            setAddModal(true);
          }}
          className='bg-light-orange px-6 py-3 text-white font-bold rounded'
        >
          신청하기
        </button>
      </div>
    </section>
  );
};

export default CartElement;
