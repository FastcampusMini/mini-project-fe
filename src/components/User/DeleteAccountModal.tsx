import { DELETE_TOKEN } from '@/features/authSlice/authSlice';
import { ax } from '@/libs/axiosClient';
import { removeCookieToken } from '@/libs/Cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import cogoToast from 'cogo-toast';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import SignInField from '../SignIn/SignInField';

interface IProps {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDeleteForm {
  password: string;
}

const DeleteAccountModal = ({ setDeleteModal }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(
    '탈퇴하시면 더 이상 서비스를\n이용하실 수 없어요.'
  );
  const schema = yup.object().shape({
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
  } = useForm<IDeleteForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { accessToken } = useSelector((state: any) => state.authToken);

  // 백으로 password 전달해서 회원탈퇴
  const onValid: SubmitHandler<IDeleteForm> = async ({ password }, event) => {
    event.preventDefault();

    const response = await ax.deleteUser(accessToken, password);
    console.log(response);

    if (response.code === 200) {
      dispatch(DELETE_TOKEN(accessToken));
      removeCookieToken();
      setDeleteModal(false);
      await cogoToast.info(response.message);
      navigate('/');
    } else {
      setMessage('기존 비밀번호와 일치하지 않습니다.\n다시 입력해주세요.');
    }

    setValue('password', '');
  };

  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <div className='flex flex-col justify-between w-80 h-auto bg-white rounded items-center p-5 pt-10'>
        <div className='h-full flex flex-col justify-center'>
          <h1 className='font-semibold text-xl w-full whitespace-normal text-yellow text-center my-4'>
            정말 탈퇴 하시겠어요?
          </h1>
          <p className=' text-black40 text-center font-semibold text-sm mb-5 whitespace-pre-line'>
            {message}
          </p>
        </div>

        <div className='w-full'>
          <SignInField
            text={'비밀번호를 입력해주세요.'}
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
            onClick={() => setDeleteModal(false)}
            className='rounded h-12 w-1/2 text-white bg-black40 hover:bg-black60'>
            취소
          </button>
          <button
            type='submit'
            onClick={handleSubmit(onValid)}
            disabled={isSubmitting}
            className={`border rounded h-12 w-1/2 text-white ${
              isValid
                ? `bg-light-orange hover:bg-orange`
                : `bg-black40 hover:bg-black60`
            }  `}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
