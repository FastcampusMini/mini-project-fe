import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const StepFive = ({ formData }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center gap-5 px-10 py-12 h-full overflow-y-scroll scrollbar-none'>
      <AiFillCheckCircle className='animate-wave text-9xl text-yellow transform transition duration-500 hover:scale-110 hover:text-yellow/80' />
      <h1 className='flex flex-col justify-center items-center gap-2 text-3xl'>
        <span>회원가입이</span>
        <span className='font-semibold'>완료되었습니다!</span>
      </h1>
      <div className='flex flex-col items-center text-black40'>
        <div className='flex gap-1'>
          <span className='text-yellow font-semibold'>{formData.name}님</span>
          <span>론테크 회원이 되신걸 축하드립니다 👋</span>
        </div>
        <p>로그인하시면 더욱 다양한 서비스와 혜택을 제공 받으실 수 있어요!</p>
      </div>
      <button
        type='button'
        onClick={() => navigate('/signin')}
        className='bg-yellow block text-center text-2xl text-white py-6 rounded-t-3xl cursor-pointer bottom-0 absolute w-full left-0'
      >
        로그인 하러가기
      </button>
    </div>
  );
};

export default StepFive;
