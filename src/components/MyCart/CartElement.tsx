import { useState, useEffect } from 'react';
import Card from './Card';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';
import { useGetCartQuery } from '@/store/api/cartApiSlice';
import { useNavigate } from 'react-router-dom';

const CartElement = ({
  cartData,
  deleteCart,
  addOrderList,
  allOrderModal,
  setAllOrderModal,
  handleItemCheckboxChange,
  orderList,
}) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [overAmount, setOverAmount] = useState(false);
  const { data: cartAll } = useGetCartQuery('');

  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <div
        className='flex justify-between py-5 pl-3 pr-2 border-solid border border-black/10 rounded-t-lg cursor-pointer'
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/products/financial/${cartData.productId}`);
        }}
      >
        <div className='flex items-center'>
          <input
            type='checkbox'
            className='form-checkbox text-yellow border-2 border-black20 rounded-full focus:border-yellow text-2xl mr-2'
            checked={cartData.isChecked}
            onChange={() => handleItemCheckboxChange(cartData.basketId)}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
          <img className='w-16' src={cartData.logo} alt='bank_logo' />
          <div className='flex flex-col mx-4 gap-2.5'>
            <h2 className='text-black40 font-semibold'>{cartData.brand}</h2>
            <h3 className='font-bold text-xl mb-2'>{cartData.name}</h3>
          </div>
        </div>
        <div className='flex'>
          <div className='pointer-events-auto flex items-center'>
            <button
              onClick={(event) => {
                event.stopPropagation();
                setDeleteModal(true);
              }}
              className='w-24 h-9 rounded border-2 border-black40 text-sm font-semibold mb-2 text-[#333333]'
            >
              삭제
            </button>
          </div>
        </div>
      </div>
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
      {allOrderModal && (
        <ConfirmModal
          title='신청하시겠습니까?'
          description=''
          onConfirm={async () => {
            const res = await addOrderList({
              products_id_list: [...orderList],
            });
            if (res.data.code === 500) {
              setAllOrderModal(false);
              setOverAmount(true);
            } else {
              orderList.map(async (value: number) => {
                await deleteCart({ basketId: value });
              });
              setAllOrderModal(false);
              navigate('/user/orderlist');
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
