import { useState, useEffect } from 'react';
import Card from './Card';
import ConfirmModal from '../ui/ConfirmModal';
import { useGetOrderListQuery } from '@/store/api/orderApiSlice';
import AlertModal from '../ui/AlertModal';
import { useGetCartQuery } from '@/store/api/cartApiSlice';

// key 값 변경 될 수도 있음
const CartElement = ({
  cartData,
  deleteCart,
  addOrderList,
  allOrderModal,
  setAllOrderModal,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const { data: order } = useGetOrderListQuery('');
  const { data: cartAll } = useGetCartQuery('');
  const orderList = [];
  console.log('cartAll', cartAll);
  cartAll.data.map((value) => {
    return orderList.push(value.productId);
  });
  console.log('orderList', orderList);
  useEffect(() => {}, []);

  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <Card data={cartData}>
        <div className='flex'>
          <div className='flex flex-col font-bold text-orange items-end gap-4 mx-4 mt-1 text-lg'>
            <span>최저 {cartData.rate}%</span>
            <span>{cartData.price}만원</span>
          </div>
          <div className='pointer-events-auto flex flex-col items-center'>
            <button
              onClick={() => {
                setDeleteModal(true);
              }}
              className='w-24 h-9 rounded border-2 border-black40 text-sm font-semibold mb-2 text-[#333333]'
            >
              삭제
            </button>
            <button
              onClick={() => {
                setAddModal(true);
              }}
              className='w-24 h-9 rounded border-2 border-orange text-sm font-semibold mb-2 text-orange'
            >
              <span className='flex items-center justify-center gap-1.5'>
                신청하기
              </span>
            </button>
          </div>
        </div>
      </Card>
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
            await addOrderList({ products_id_list: [cartData.productId] });
            await deleteCart({ basketId: cartData.basketId });
            setAddModal(false);
          }}
          onCancel={() => setAddModal(false)}
        />
      )}
      {allOrderModal && (
        <ConfirmModal
          title='전체 상품을 신청하시겠습니까?'
          description=''
          onConfirm={async () => {
            await addOrderList({ products_id_list: [...orderList] });
            cartAll.data.map(async (value) => {
              await deleteCart({ basketId: value.basketId });
            });
            setAllOrderModal(false);
          }}
          onCancel={() => setAllOrderModal(false)}
        />
      )}
      {alertModal && <AlertModal setAlertModal={setAlertModal} />}
    </section>
  );
};

export default CartElement;
