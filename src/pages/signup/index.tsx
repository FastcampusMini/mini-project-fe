import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../../components/SignUp/TextField';
import ConfirmBtn from '../../components/ConfirmBtn';
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
    <>
      <div className='relative overflow-y-scroll'>
        <div>
          <p className='text-right mb-7 text-lg font-semibold cursor-pointer'>취소</p>
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
      </div>
      <ConfirmBtn />
    </>
  );
};

export default SignUp;
