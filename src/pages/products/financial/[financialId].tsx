import { useEffect, useState } from 'react';
import { ax } from '@libs/axiosClient';
import { useParams } from 'react-router-dom';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useAddOrderListMutation } from '@/store/api/orderApiSlice';
import AlertModal from '@/components/ui/AlertModal';
import { useAddCartMutation } from '@/store/api/cartApiSlice';
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
  useGetWishListQuery,
} from '@/store/api/wishlistApiSlice';
import Nav from '@components/Nav';
import Navigation from '@components/ui/Navigation';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Id = () => {
  const [addOrderList] = useAddOrderListMutation();
  const [addCart] = useAddCartMutation();
  const [addWishList] = useAddWishListMutation();
  const [deleteWishList] = useDeleteWishListMutation();
  const { data: wishList } = useGetWishListQuery('');
  const { financialId } = useParams();
  const [orderModal, setOrderModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [like, setLike] = useState(false);
  const [detail, setDetail] = useState<IProduct>();

  useEffect(() => {
    {
      wishList?.data?.map((value: DaumData) => {
        if (value.productId === detail?.productId) setLike(true);
      });
    }
  }, [wishList, detail]);

  useEffect(() => {
    if (like) {
      addWishList({
        productId: detail?.productId,
      });
    } else if (!like && detail) {
      const find = wishList?.data?.find((value) => {
        return value?.productId === detail?.productId;
      });
      deleteWishList({
        wishlistId: find?.wishlistId,
      });
    }
  }, [like]);

  useEffect(() => {
    const getDetails = async (financialId: string | number) => {
      const res = await ax.getProductsDetails(financialId);
      setDetail(res);
      console.log(res);
    };
    console.log(detail);
    getDetails(financialId);
  }, []);

  return (
    <>
    <div className='h-full overflow-y-scroll bg-yellow'>
      <Nav left='arrow' addClass='mt-5' />
    <div className='px-10 pb-16 relative top-5 bg-white rounded-t-3xl shadow-md'>
      <div className='flex justify-between relative top-[-20px]'>
        <img className='w-32 relative top-[-10px]' src={detail?.logo} alt='cartItem_logo' />
        <div
          className='h-fit p-2 bg-white rounded-[10px] shadow-md text-4xl cursor-pointer hover:scale-110 transition-transform'
          onClick={() => {
            setLike(!like);
          }}
        >
          {like ? (
            <AiFillHeart className='text-orange' />
          ) : (
            <AiOutlineHeart className='text-gray' />
          )}
        </div>
      </div>
      <h2 className='mb-8 text-3xl font-bold'>{detail?.name}</h2>
      <ul className='mb-12 flex flex-wrap gap-3'>
        {['20대 이상', '파킹통장', '세테크', '청년', '경기도', '낮은이자', '그 외 필터'].map((data, i) => (
          <li
            key={i}
            className='px-4 py-2 rounded-full border border-yellow bg-white/100 text-yellow font-bold'
          >
            {data}
          </li>
        ))}
      </ul>
      <div className='py-2 flex justify-between text-lg'>
        <span className='text-black40 font-bold'>이율</span>
        <b className='text-orange'>최저 {detail?.rate} %</b>
      </div>
      <div className='py-2 flex justify-between text-lg'>
        <span className='text-black40 font-bold'>문의</span>
        <b>{detail?.detail}</b>
      </div>
      <h3 className='mt-10 mb-4 text-2xl font-bold'>상품 설명</h3>
      <div className='text-orange font-bold text-lg'>
        청년 대출을 만나보세요. 소득이 없거나 재직기간이 1년 미만인 직장인도 만
        19-34세 무주택 청년이라면 대출신청이 가능합니다.
      </div>
      <h3 className='mt-12 mb-4 text-2xl font-bold'>안내 사항</h3>
      <ul className='text-black60 text-lg'>
        <li>상품 약관 등 추가할 수 있는 정보. 길이 제한 없음.</li>
        <li>
          - 연체 이자율 : 회원별 · 이용상품별 정상이자율 + 3%p(최고 연 24%)
        </li>
        <li>- 연체발생시점에 정상이자율이 없는 경우 아래와 같이 적용.</li>
        <li>
          - 상환능력에 비해 신용카드 사용액이 과도할 경우 귀하의 개인신용평점이
          하락할 수 있습니다.
        </li>
      </ul>
      <button
        type='button'
        className='mt-16 p-4 w-full rounded-[10px] border border-orange bg-white text-orange text-lg font-bold'
        onClick={() => setAddModal(true)}
      >
        장바구니 담기
      </button>
      <button
        type='button'
        className='mt-6 mb-28 p-4 w-full rounded-[10px] bg-yellow text-white text-lg font-bold'
        onClick={() => setOrderModal(true)}
      >
        신청하기
      </button>

          {orderModal && (
            <ConfirmModal
              title='신청하시겠습니까?'
              description=''
              onConfirm={async () => {
                await addOrderList({ products_id_list: [detail.productId] });
                setOrderModal(false);
              }}
              onCancel={() => setOrderModal(false)}
            />
          )}
          {addModal && (
            <ConfirmModal
              title='장바구니에 담으시겠습니까?'
              description=''
              onConfirm={async () => {
                const res = await addCart({
                  productId: detail?.productId,
                })
                  .unwrap()
                  .then((payload) => payload.code)
                  .catch((error) => console.error('rejected', error));
                if (res === 500) {
                  setAddModal(false);
                  setAlertModal(true);
                } else {
                  setAddModal(false);
                }
              }}
              onCancel={() => setAddModal(false)}
            />
          )}
          {alertModal && <AlertModal setAlertModal={setAlertModal} />}
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default Id;
