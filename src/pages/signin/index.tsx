import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ConfrimBtn from '../../components/ui/ConfirmBtn';

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  return (
    <>
      <div className='relative'>
        <p className='text-right mb-7 text-lg font-semibold cursor-pointer'>취소</p>
        <h1 className='text-3xl mb-10'>
          핀크 이용을 위해 <br />
          <span className='font-semibold'>본인확인</span>을 해주세요
        </h1>
        <form className='flex flex-col'>
          <input
            className='text-gray border px-6 py-3 rounded-md mb-8'
            type='text'
            placeholder='메일'
            {...register('email')}
          />
          <input
            className='text-gray border px-6 py-3 rounded-md'
            type='text'
            placeholder='비밀번호'
            {...register('password')}
          />
          <div
            className='flex items-center justify-center gap-1 my-10 font-semibold text-gray cursor-pointer'
            onClick={() => navigate('/signup')}
          >
            <p>회원가입을 아직 안하셨나요?</p>
            <IoIosArrowForward />
          </div>
        </form>
      </div>
      <ConfrimBtn />
    </>
  );
};

export default SignIn;
