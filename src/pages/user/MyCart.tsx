import { useState, useEffect } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import CartElement from '@components/MyCart/CartElement';
import EmptyCart from '@components/MyCart/EmptyCart';
import Nav from '@/components/Nav';
import {
  useGetCartQuery,
  useDeleteCartMutation,
} from '../../store/api/cartApiSlice';
import { useAddOrderListMutation } from '@/store/api/orderApiSlice';
import SkeletonWishListElement from '@/components/WishList/SkeletonWishListElement';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';
import OrderList from './OrderList';

const Mycart = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading, isFetching } = useGetCartQuery('');
  const [deleteCart] = useDeleteCartMutation();
  const [addOrderList] = useAddOrderListMutation();
  const [isValid, setIsValid] = useState(false);
  const [allOrderModal, setAllOrderModal] = useState(false);
  const [items, setItems] = useState([]); // 장바구니 아이템 배열
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 체크박스 상태
  let orderList = [];
  useEffect(() => {
    items?.map((value) => {
      if (value.isChecked) {
        return orderList.push(value.productId);
      }
    });
  }, [allOrderModal]);
  console.log('orderList', orderList);

  // 각 아이템 체크박스의 상태 변경 이벤트 핸들러
  function handleItemCheckboxChange(basketId) {
    const updatedItems = items.map((item) => {
      if (item?.basketId === basketId) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.isChecked));
  }

  // 전체 선택 체크박스의 상태 변경 이벤트 핸들러
  function handleSelectAllCheckboxChange() {
    const updatedItems = items.map((item) => {
      return {
        ...item,
        isChecked: !selectAll,
      };
    });
    setItems(updatedItems);
    setSelectAll(!selectAll);
  }

  useEffect(() => {
    if (cart?.data) {
      setItems([...cart.data]);
    }
  }, [cart]);

  useEffect(() => {
    const find = items.find((value) => {
      return value.isChecked === true;
    });
    if (find) setIsValid(true);
    else setIsValid(false);
  }, [items]);
  return (
    <>
      <article className='h-full px-10 pt-8 pb-24 overflow-y-scroll scrollbar-none'>
        <div className='flex justify-between'>
          <Nav left='arrow' />
          <div className='flex gap-4'>
            <CgProfile
              onClick={() => navigate('/user')}
              className='text-3xl cursor-pointer text-gray hover:text-yellow'
            />
            <AiFillHome
              onClick={() => navigate('/main')}
              className='text-3xl cursor-pointer text-gray hover:text-yellow'
            />
          </div>
        </div>
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          장바구니
        </h1>
        <div className='max-w-screen-sm h-fit'>
          <label className='flex items-center mt-3 mb-3 ml-3'>
            <input
              type='checkbox'
              id='select-all'
              className='form-checkbox text-yellow border-2 border-black20 rounded-full focus:border-yellow text-2xl mr-2 cursor-pointer'
              checked={selectAll}
              onChange={handleSelectAllCheckboxChange}
            />
            <span className='ml-2 text-gray-700'>전체 선택</span>
          </label>
          {items?.map((value: DaumData) => (
            <CartElement
              cartData={value}
              deleteCart={deleteCart}
              addOrderList={addOrderList}
              key={value.basketId}
              allOrderModal={allOrderModal}
              setAllOrderModal={setAllOrderModal}
              handleItemCheckboxChange={handleItemCheckboxChange}
              orderList={orderList}
            />
          ))}
          {items?.length === 0 ? (
            <EmptyCart>
              <MdOutlineShoppingCart className='text-7xl' />
              <p className='text-center font-extrabold text-lg'>
                장바구니에
                <br />
                담긴 상품이 없습니다.
              </p>
            </EmptyCart>
          ) : null}
          {(isLoading || isFetching) && <SkeletonWishListElement />}
        </div>
      </article>
      <button
        className={`block text-center text-3xl ${
          isValid ? `bg-yellow cursor-pointer` : `bg-gray cursor-not-allowed`
        } text-white py-6 rounded-t-3xl bottom-0 absolute w-full left-0`}
        onClick={() => {
          setAllOrderModal(true);
        }}
      >
        신청하기
      </button>
    </>
  );
};

export default Mycart;
