import React, { InputHTMLAttributes } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ConfrimBtn from '../../components/ui/ConfirmBtn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SignInField from '../../components/SignIn/SignInField';
import { signIn } from '../../api/authApi';
import { useCookies } from 'react-cookie';
interface ISignInForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('이메일 형식이 맞지 않습니다.').required('이메일은 필수 입력입니다.'),
    password: yup.string().required('비밀번호는 필수 입력입니다.').min(8, '8자리 이상 비밀번호를 사용하세요.').max(25),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<ISignInForm>({ mode: 'onChange', reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const handleCookie = (email: string, password: string, accessToken: string) => {
    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 30);
    setCookie(
      'cookie_name',
      { email: email, password: password, accessToken: accessToken },
      { path: '/', expires: expireDate }
      // , secure: true, httpOnly: true
    );
  };

  const login: SubmitHandler<ISignInForm> = async ({ email, password }, event) => {
    event.preventDefault();
    console.log('email', email);
    console.log('password', password);
    // console.log('event', event);
    const { accessToken } = await signIn({ email, password });

    if (accessToken) {
      handleCookie(email, password, accessToken);
    } else {
      alert('로그인에 실패하셨습니다.');
    }
    navigate('/main');
  };

  return (
    <>
      <div>
        <p className='text-right mb-7 text-lg font-semibold cursor-pointer' onClick={() => navigate('/')}>
          취소
        </p>
        <h1 className='text-3xl mb-10'>
          핀크 이용을 위해 <br />
          <span className='font-semibold'>본인확인</span>을 해주세요
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit(login)}>
          <SignInField
            text={'example@email.com'}
            name={'email'}
            register={register}
            errorMsg={errors.email}
            isDirty={isDirty}
          />
          <SignInField
            text={'********'}
            name={'password'}
            inputType='password'
            register={register}
            errorMsg={errors.password}
            isDirty={isDirty}
          />
          <ConfrimBtn isValid={isValid} isSubmitting={isSubmitting} />
        </form>
        <div
          className='flex items-center justify-center gap-1 my-8 font-semibold text-gray cursor-pointer hover:text-yellow'
          onClick={() => navigate('/signup')}
        >
          <p>회원가입을 아직 안하셨나요?</p>
          <IoIosArrowForward />
        </div>
      </div>
    </>
  );
};

export default SignIn;
