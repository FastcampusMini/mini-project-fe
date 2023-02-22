import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface IProps {
  userInfo?: IUserInfo;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export const TotalLoans = ({ userInfo, onClick }: IProps) => {
  return (
    <>
      <div
        className='w-full h-auto shadow-md rounded-lg border border-black/10'
        onClick={onClick}>
        <div className='px-4 pt-8'>
          <span className='font-semibold text-black/50'>
            <span className='text-orange font-bold text-lg'>
              {userInfo.name ? `${userInfo.name}님 ` : ''}
            </span>
            신청 가능한 대출금 총합
          </span>
          <div className='flex justify-between items-center h-20 mb-3'>
            <h3 className='font-bold text-3xl'>
              {userInfo?.availableAmount}
              <span className='text-2xl'>만 원</span>
            </h3>
            <div className='flex gap-3'>
              <Link to='/user'>
                <button className='border border-gray px-6 py-1 rounded-md text-black/50 font-semibold hover:bg-black/5'>
                  내 정보
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Link to='/user/orderlist'>
          <div className='flex border-t border-t-black/10 px-5 justify-between h-14 items-center hover:bg-black5'>
            <span className='font-semibold text-black/60 text-lg'>
              가입한 상품
            </span>
            <BiChevronRight
              size='30'
              className='text-black/60 cursor-pointer'
            />
          </div>
        </Link>
      </div>
    </>
  );
};
