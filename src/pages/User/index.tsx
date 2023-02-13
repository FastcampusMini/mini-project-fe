import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const User = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='border w-[640px] min-w-[50%] m-auto h-[900px] px-10 py-10 relative'>
        <h1 className='text-3xl mt-10 mb-5'>
          안녕하세요! <span className='font-semibold'>홍혜원님</span>
        </h1>
        <div className='flex items-center gap-1 font-semibold text-gray' onClick={() => navigate('/signup')}>
          <p>내 프로필 보기</p>
          <IoIosArrowForward />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default User;
