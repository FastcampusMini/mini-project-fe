import { deleteAuth } from '@/api/authApi';
import { DELETE_TOKEN } from '@/features/authSlice/authSlice';
import { removeCookieToken } from '@/libs/Cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import SignInField from '../SignIn/SignInField';

interface IProps {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: any;
}

interface IDeleteForm {
  password: string;
}

const ConfirmModal = ({ onCancel, onConfirm, title, description = '' }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    password: yup.string().required('비밀번호는 필수 입력입니다.').min(8, '8자리 이상 비밀번호를 사용하세요.').max(25),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<IDeleteForm>({ mode: 'onChange', reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const { accessToken } = useSelector((state: any) => state.authToken);

  // console.log('onConfirm:', onConfirm(accessToken));

  // 백으로 password 전달해서 회원탈퇴
  // const onValid: SubmitHandler<IDeleteForm> = async ({ password }, event) => {
  //   event.preventDefault();
  //   console.log('password:', password);

  //   const response = await deleteAuth(accessToken, password);
  //   console.log(response);

  //   if (response.code === 200) {
  //     dispatch(DELETE_TOKEN(accessToken));
  //     removeCookieToken();
  //     alert(response.message);
  //     navigate('/');
  //   } else {
  //     alert(response.message);
  //   }

  //   setValue('password', '');
  // };

  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <form
        onSubmit={onConfirm}
        className='flex flex-col justify-between w-96 h-auto bg-white rounded items-center p-5 pt-10'
      >
        <div className='h-full flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl w-full whitespace-normal text-orange text-center my-4'>{title}</h1>
          <p className=' text-black40 text-center font-semibold mb-5 whitespace-pre-line'>{description}</p>
        </div>

        <div className='w-full'>
          <SignInField
            text={'********'}
            name={'password'}
            inputType='password'
            register={register}
            errorMsg={errors.password}
            isDirty={isDirty}
          />
        </div>

        <div className='w-full flex gap-4 h-auto'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded h-14 w-1/2 text-white bg-black40 hover:bg-black60'
          >
            취소
          </button>
          <button
            type='submit'
            // onClick={onConfirm}
            className='border rounded h-14 w-1/2 text-white bg-light-orange hover:bg-orange'
          >
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmModal;
