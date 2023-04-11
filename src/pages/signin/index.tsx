import React, { InputHTMLAttributes } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ConfrimBtn from '../../components/ui/ConfirmBtn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SignInField from '../../components/SignIn/SignInField';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setRefreshToken } from '@/libs/Cookie';
import { SET_TOKEN } from '@/features/authSlice/authSlice';
import cogoToast from 'cogo-toast';
import { ax } from '@/libs/axiosClient';
interface ISignInForm {
  email?: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('이메일 형식이 맞지 않습니다.')
      .required('이메일은 필수 입력입니다.'),
    password: yup
      .string()
      .required('비밀번호는 필수 입력입니다.')
      .min(8, '8자리 이상 비밀번호를 사용하세요.')
      .max(25),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<ISignInForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'test@test.com',
      password: 'test@test.com',
    },
  });

  // 백으로 유저 정보 전달하여 로그인 요청
  const onValid: SubmitHandler<ISignInForm> = async (
    { email, password },
    event
  ) => {
    event.preventDefault();
    const response = await ax.postLogin({ email, password });

    if (response.code === 200) {
      // cookie에 refreshToken, store에 accessToken 저장
      const { accessToken, refreshToken } = response.data;
      setRefreshToken(refreshToken);
      dispatch(SET_TOKEN(accessToken));
      cogoToast.info('로그인에 성공하셨습니다.');
      navigate('/main');
    } else {
      cogoToast.info(response.message);
    }
    setValue('password', '');
  };

  return (
    <>
      <div className='px-10 py-10'>
        <p
          className='text-right mb-7 text-lg font-semibold cursor-pointer'
          onClick={() => navigate('/')}>
          취소
        </p>
        <h1 className='text-3xl mb-10'>
          <em className='text-orange font-semibold'>LoanTech</em> 이용을 위해{' '}
          <br />
          <span className='font-semibold'>본인확인</span>을 해주세요
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit(onValid)}>
          <SignInField
            text={'example@email.com'}
            name={'email'}
            register={register}
            errorMsg={errors.email}
            isDirty={isDirty}
          />
          <SignInField
            text={'************'}
            name={'password'}
            inputType='password'
            register={register}
            errorMsg={errors.password}
            isDirty={isDirty}
          />
          <ConfrimBtn isValid={isValid} isSubmitting={isSubmitting} />
        </form>
        <div
          className='flex items-center justify-center gap-1 my-5 font-semibold text-sm text-black20 cursor-pointer hover:text-yellow'
          onClick={() => navigate('/signup')}>
          <p>회원가입을 아직 안하셨나요?</p>
          <IoIosArrowForward />
        </div>
      </div>
    </>
  );
};

export default SignIn;
