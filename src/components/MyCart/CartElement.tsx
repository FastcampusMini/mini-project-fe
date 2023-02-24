import { useState } from 'react';
import Card from './Card';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';
import { useGetCartQuery } from '@/store/api/cartApiSlice';

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
  const [overAmount, setOverAmount] = useState(false);
  const { data: cartAll } = useGetCartQuery('');
  const orderList = [];
  cartAll.data.map((value) => {
    return orderList.push(value.productId);
  });

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
              onClick={(event) => {
                event.stopPropagation();
                setDeleteModal(true);
              }}
              className='w-24 h-9 rounded border-2 border-black40 text-sm font-semibold mb-2 text-[#333333]'
            >
              삭제
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
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
            const res = await addOrderList({
              products_id_list: [cartData.productId],
            });
            if (res.data.code === 500) {
              setAddModal(false);
              setOverAmount(true);
            } else {
              await deleteCart({ basketId: cartData.basketId });
              setAddModal(false);
            }
          }}
          onCancel={() => setAddModal(false)}
        />
      )}
      {allOrderModal && (
        <ConfirmModal
          title='전체 상품을 신청하시겠습니까?'
          description=''
          onConfirm={async () => {
            const res = await addOrderList({
              products_id_list: [...orderList],
            });
            if (res.data.code === 500) {
              setAllOrderModal(false);
              setOverAmount(true);
            } else {
              cartAll.data.map(async (value) => {
                await deleteCart({ basketId: value.basketId });
              });
              setAllOrderModal(false);
            }
          }}
          onCancel={() => setAllOrderModal(false)}
        />
      )}
      {alertModal && (
        <AlertModal
          setAlertModal={setAlertModal}
          content='이미 존재하는 상품입니다.'
        />
      )}
      {overAmount && (
        <AlertModal
          setAlertModal={setOverAmount}
          content='대출 가능 금액을 초과하였습니다.'
        />
      )}
    </section>
  );
};

export default CartElement;
