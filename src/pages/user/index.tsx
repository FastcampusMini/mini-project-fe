import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillBookmarkHeartFill, BsFillCartCheckFill } from 'react-icons/bs';
import { FaUserTimes, FaUserMinus } from 'react-icons/fa';
import { MdAccountBalanceWallet } from 'react-icons/md';
import Navigation from '@components/ui/Navigation';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeCookieToken } from '../../libs/Cookie';
import { logOut } from '@/api/authApi';
import { DELETE_TOKEN } from '@/features/authSlice/authSlice';
import DeleteAccountModal from '@/components/User/DeleteAccountModal';
import useGetUser from '@/libs/hooks/useGetUser';

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [outModal, setOutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { accessToken } = useSelector((state: any) => state.authToken);

  const { data: userInfo, isLoading: fetchingUser } = useGetUser(accessToken);

  if (fetchingUser) return;

  const { email, job, name, birth, phone, salary } = userInfo;

  // 로그아웃 api 호출
  const userlogOut = async (accessToken: string) => {
    const response = await logOut(accessToken);
    console.log('response:', response);

    if (response.code === 200) {
      // alert(response.message);
      dispatch(DELETE_TOKEN());
      removeCookieToken();
      return navigate('/');
    } else {
      // alert(response.message);
    }
  };

  const logOutConfirm = () => {
    userlogOut(accessToken);
    setOutModal(false);
  };

  return (
    <>
      <div className='relative'>
        {outModal && (
          <ConfirmModal
            title='정말 로그아웃 하시겠어요?'
            onConfirm={logOutConfirm}
            onCancel={() => setOutModal(false)}
          />
        )}
        {deleteModal && <DeleteAccountModal setDeleteModal={setDeleteModal} />}
        <h1 className='text-3xl mt-10 mb-2'>
          안녕하세요! <span className='font-semibold'>{name}님</span>
        </h1>

        <div
          className='flex items-center gap-1 font-semibold text-gray cursor-pointer mb-6 mt-5 hover:text-yellow'
          onClick={() => navigate('/user/edit')}
        >
          <p>내 프로필 수정하기</p>
          <IoIosArrowForward />
        </div>

        <p className='text-lg font-semibold border-t pt-3 border-black5'>나의 프로필</p>
        <div className='mb-6'>
          <div
            className='flex justify-between text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/wishlist')}
          >
            <div className='flex items-center gap-4'>
              <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
              <span>이메일</span>
            </div>
            <div className='text-black/40'>{email}</div>
          </div>
          <div
            className='flex justify-between text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/wishlist')}
          >
            <div className='flex items-center gap-4'>
              <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
              <span>전화번호</span>
            </div>
            <div className='text-black/40'>{phone}</div>
          </div>
          <div
            className='flex justify-between text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/wishlist')}
          >
            <div className='flex items-center gap-4'>
              <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
              <span>직업</span>
            </div>
            <div className='text-black/40'>{job}</div>
          </div>
        </div>

        <p className='text-lg font-semibold'>나의 금융정보</p>
        <div className='mb-6'>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/wishlist')}
          >
            <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
            <span>관심상품</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5  cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/user/mycart')}
          >
            <BsFillCartCheckFill className='text-yellow text-2xl ' />
            <span>장바구니</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5  cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate('/signup')}
          >
            <MdAccountBalanceWallet className='text-yellow text-2xl' />
            <span>신청한 상품 내역</span>
          </div>
        </div>

        <p className='text-lg font-semibold'>계정</p>
        <div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => setOutModal(true)}
          >
            <FaUserMinus className='text-yellow text-2xl' />
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
