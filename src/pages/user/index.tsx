import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillBookmarkHeartFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaUserTimes } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import Navigation from "@components/ui/Navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCookieToken, removeCookieToken } from "../../libs/Cookie";
import { logOut } from "@/api/authApi";
import { DELETE_TOKEN } from "@/features/authSlice/authSlice";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  // const { accessToken } = useSelector((state) => state.authToken);

  // const refreshToken: string = getCookieToken();
  const logOutConfirm = () => {
    setModalOpen(false);
  };

  // const userlogOut = async (refreshtoken: string) => {
  //   const response = await logOut({ token: refreshtoken });

  //   if (response.status) {
  //     dispatch(DELETE_TOKEN());
  //     removeCookieToken();
  //     return navigate('/');
  //   } else {
  //     // 뭐하지..
  //   }
  // };
  const userlogOut = async (refreshtoken: string) => {
    // const response = await logOut({ token: refreshtoken });
    // if (response.status) {
    //   dispatch(DELETE_TOKEN());
    //   removeCookieToken();
    //   return navigate('/');
    // } else {
    // 뭐하지..
    // }
  };

  return (
    <>
      <div className='relative'>
        {modalOpen && (
          <ConfirmModal
            title='로그아웃 하시겠습니까?'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam magnam error provident iste,'
            onConfirm={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          />
        )}
        <h1 className='text-3xl mt-10 mb-5'>
          안녕하세요! <span className='font-semibold'>홍혜원님</span>
        </h1>
        <div
          className='flex items-center gap-1 font-semibold text-gray cursor-pointer mb-10 hover:text-yellow'
          onClick={() => navigate("/user/edit")}>
          <p>내 프로필 보기</p>
          <IoIosArrowForward />
        </div>
        <p className='text-2xl font-semibold mb-6'>나의 금융정보</p>
        <div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate("/user/wishlist")}>
            <BsFillBookmarkHeartFill className='text-yellow text-2xl' />
            <span>관심상품</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate("/user/mycart")}>
            <BsFillCartCheckFill className='text-yellow text-2xl ' />
            <span>장바구니</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 border-b border-black5 cursor-pointer hover:bg-black5 hover:rounded-xl hover:border-white transition-all hover:px-2'
            onClick={() => navigate("/signup")}>
            <MdAccountBalanceWallet className='text-yellow text-2xl' />
            <span>신청한 상품 내역</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => setModalOpen(true)}>
            <FaUserTimes className='text-yellow text-2xl' />
            <span>로그아웃</span>
          </div>
          <div
            className='flex items-center gap-4 text-xl py-5 cursor-pointer hover:bg-black5 hover:rounded-xl transition-all hover:px-2'
            onClick={() => navigate("/signup")}>
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
