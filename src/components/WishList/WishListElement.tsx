import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import Card from '../MyCart/Card';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';
import { useGetCartQuery } from '@/store/api/cartApiSlice';

const WishListElement = ({ wishlistData, addCart, deleteWishList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const { data: cart } = useGetCartQuery('');

  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <Card data={wishlistData}>
        <div className='flex'>
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
                <BsCart2 className='text-base' />
                담기
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
            await deleteWishList(wishlistData.productId);
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
      {addModal && (
        <ConfirmModal
          title='장바구니에 담으시겠습니까?'
          description=''
          onConfirm={async () => {
            const find = cart?.data.find(
              (value) => value.productId === wishlistData.productId,
            );
            if (find) {
              setAddModal(false);
              setAlertModal(true);
              return;
            }
            await addCart({ productId: wishlistData.productId });
            await deleteWishList(wishlistData.productId);
            setAddModal(false);
          }}
          onCancel={() => setAddModal(false)}
        />
      )}
      {alertModal && (
        <AlertModal
          setAlertModal={setAlertModal}
          content='이미 존재하는 상품입니다.'
        />
      )}
    </section>
  );
};

export default WishListElement;
