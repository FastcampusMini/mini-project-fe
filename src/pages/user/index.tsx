import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillBookmarkHeartFill, BsFillCartCheckFill } from 'react-icons/bs';
import { FaUserTimes } from 'react-icons/fa';
import { MdAccountBalanceWallet } from 'react-icons/md';

const User = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='relative'>
        <h1 className='text-3xl mt-10 mb-5'>
          안녕하세요! <span className='font-semibold'>홍혜원님</span>
        </h1>
        <div
          className='flex items-center gap-1 font-semibold text-gray cursor-pointer mb-10'
          onClick={() => navigate('/user/edit')}
        >
          <p>내 프로필 보기</p>
          <IoIosArrowForward />
        </div>
        <p className='text-2xl font-semibold mb-6'>나의 금융정보</p>
        <div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-light-gray cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/wishlist')}
          >
            <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
            <span>관심상품</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-light-gray cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/mycart')}
          >
            <BsFillCartCheckFill className='text-yellow text-2xl ' />
            <span>장바구니</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-light-gray cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/signup')}
          >
            <MdAccountBalanceWallet className='text-yellow text-2xl' />
            <span>신청한 상품 내역</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => navigate('/signup')}
          >
            <FaUserTimes className='text-yellow text-2xl' />
            <span>회원탈퇴</span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default User;
