import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import Card from '../MyCart/Card';
import ConfirmModal from '../ui/ConfirmModal';
import AlertModal from '../ui/AlertModal';

const WishListElement = ({ wishlistData, addCart, deleteWishList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      {deleteModal && (
        <ConfirmModal
          title='삭제하시겠습니까?'
          description=''
          onConfirm={async () => {
            await deleteWishList({
              wishlistId: wishlistData.wishlistId,
            });
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
            const res = await addCart({
              productId: wishlistData.productId,
            });
            if (res.data.code === 500) {
              setAddModal(false);
              setAlertModal(true);
            } else {
              await deleteWishList({
                wishlistId: wishlistData.wishlistId,
              });
              setAddModal(false);
            }
          }}
          onCancel={() => setAddModal(false)}
        />
      )}
      {alertModal && <AlertModal setAlertModal={setAlertModal} />}
      <Card data={wishlistData}>
        <div className='flex'>
          <div className='flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg'>
            <span>최저 5.5%</span>
            <span>{wishlistData.price}만원</span>
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
                <BsCart2 className='text-base' />
                담기
              </span>
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default WishListElement;
