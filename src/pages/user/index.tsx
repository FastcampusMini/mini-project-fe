import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillBookmarkHeartFill, BsFillCartCheckFill } from 'react-icons/bs';
import { FaUserTimes } from 'react-icons/fa';
import { MdAccountBalanceWallet } from 'react-icons/md';
import Navigation from '@components/ui/Navigation';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCookieToken, removeCookieToken, setRefreshToken } from '../../libs/Cookie';
import { deleteAuth, getUserInfo, logOut } from '@/api/authApi';
import { authState, DELETE_TOKEN } from '@/features/authSlice/authSlice';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SignInField from '@/components/SignIn/SignInField';
import DeleteAccountModal from '@/components/User/DeleteAccountModal';

// interface IGetUserInfo {
//   code: number;
//   data: IUserInfo;
//   message: string;
// }
// export interface IUserInfo {
//   email: string;
//   password: string;
//   name: string;
//   birth: string;
//   phone: string;
//   salary: number;
//   job: string;
//   availableAmount: number;
// }

interface IDeleteForm {
  password: string;
}

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [outModal, setOutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { accessToken } = useSelector((state: any) => state.authToken);
  const token = useSelector((state: any) => state.authToken);
  // console.log('token:', token);

  const schema = yup.object().shape({
    password: yup.string().required('비밀번호는 필수 입력입니다.').min(8, '8자리 이상 비밀번호를 사용하세요.').max(25),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<IDeleteForm>({ mode: 'onChange', reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const refreshToken: string = getCookieToken();

  const userlogOut = async (accessToken: string) => {
    const response = await logOut(accessToken);
    console.log('response:', response);

    if (response.code === 200) {
      alert(response.message);
      dispatch(DELETE_TOKEN());
      removeCookieToken();
      return navigate('/');
    } else {
      alert(response.message);
    }
  };

  // 백으로 password 전달해서 회원탈퇴
  const onValid: SubmitHandler<IDeleteForm> = async ({ password }, event) => {
    // event.preventDefault();
    console.log('accessToken:', accessToken);

    console.log('password:', password);

    const response = await deleteAuth(accessToken, password);
    console.log(response);

    if (response.code === 200) {
      dispatch(DELETE_TOKEN());
      removeCookieToken();
      setDeleteModal(false);
      alert(response.message);
      navigate('/');
    } else {
      alert(response.message);
    }

    setValue('password', '');
  };

  const logOutConfirm = () => {
    userlogOut(accessToken);
    setOutModal(false);
  };

  const deleteConfirm = () => {
    console.log('delete');
    // handleSubmit(onValid);
  };

  const deleteMsg = '탈퇴하시면 더 이상 서비스를\n이용하실 수 없어요.';

  return (
    <>
      <div className='relative'>
        {outModal && (
          <ConfirmModal title='로그아웃 하시겠어요?' onConfirm={logOutConfirm} onCancel={() => setOutModal(false)} />
        )}
        {deleteModal && <DeleteAccountModal onCancel={() => setDeleteModal(false)} />}
        <h1 className='text-3xl mt-10 mb-5'>
          안녕하세요! <span className='font-semibold'>홍혜원님</span>
        </h1>
        <div
          className='flex items-center gap-1 font-semibold text-gray cursor-pointer mb-10 hover:text-yellow'
          onClick={() => navigate('/user/edit')}>
          <p>내 프로필 보기</p>
          <IoIosArrowForward />
        </div>
        <p className='text-2xl font-semibold mb-6'>나의 금융정보</p>
        <div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/wishlist')}>
            <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
            <span>관심상품</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/mycart')}>
            <BsFillCartCheckFill className='text-yellow text-2xl ' />
            <span>장바구니</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/signup')}>
            <MdAccountBalanceWallet className='text-yellow text-2xl' />
            <span>신청한 상품 내역</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => setOutModal(true)}
          >
            <FaUserTimes className='text-yellow text-2xl' />
            <span>로그아웃</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            <FaUserTimes className='text-yellow text-2xl' />
            <span>회원탈퇴</span>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default User;
