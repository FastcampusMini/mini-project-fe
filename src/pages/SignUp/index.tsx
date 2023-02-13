import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../../components/SignUp/TextField';

interface ISignUpForm {
  name: string;
  age: string;
  email: string;
  pw: string;
  phone: string;
  job: string;
  salary: string;
  birth: string;
}

const SignUp = () => {
  const { register, handleSubmit, setError } = useForm<ISignUpForm>({ mode: 'onBlur' });

  return (
    <div className='border w-[640px] min-w-[50%] m-auto h-[900px] relative overflow-y-scroll'>
      <div className='px-10 py-10'>
        <p className='text-right mb-7 text-lg font-semibold'>취소</p>
        <h1 className='text-3xl mb-10'>
          <span className='font-semibold'>회원 정보</span>
          <span>를 입력해 주세요</span>
        </h1>
        <form className='flex flex-col'>
          <TextField text={'이름'} name={'name'} register={register} />
          <TextField text={'나이'} name={'age'} register={register} />
          <TextField text={'이메일'} name={'email'} inputType='email' register={register} />
          <TextField text={'비밀번호'} name={'pw'} inputType='password' register={register} />
          <TextField text={'전화번호'} name={'email'} register={register} />
          <TextField text={'생년원일'} name={'birth'} inputType='date' register={register} />
          <TextField text={'직업'} name={'job'} register={register} />
          <TextField text={'연소득'} name={'salary'} register={register} />
        </form>
      </div>
      <button className='bg-yellow w-full py-8 sticky bottom-0 right-0 text-lg font-semibold' type='submit'>
        확인
      </button>
    </div>
  );
};

export default SignUp;
