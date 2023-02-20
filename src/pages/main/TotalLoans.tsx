import React from "react";
import { BiChevronRight } from "react-icons/bi";

export const TotalLoans = ({ amount, onClick }) => {
  return (
    <>
      <div
        className='w-full h-auto shadow-md rounded-lg border border-black/10'
        onClick={onClick}>
        <div className='px-4 pt-8'>
          <span className='font-semibold text-black/50'>
            신청 가능한 대출금 총합
          </span>
          <div className='flex justify-between items-center h-20 mb-3'>
            <h3 className='font-bold text-3xl'>{amount}원</h3>
            <div className='flex gap-3'>
              <button className='border border-gray px-6 py-1 rounded-md text-black/50 font-semibold hover:bg-black/5'>
                내역
              </button>
              <button className='border border-gray px-6 py-1 rounded-md text-black/50 font-semibold hover:bg-black/5'>
                충전
              </button>
            </div>
          </div>
        </div>

        <div className='flex border-t border-t-black/10 px-5 justify-between h-14 items-center'>
          <span className='font-semibold text-black/60 text-lg'>
            가입한 상품
          </span>
          <BiChevronRight size='30' className='text-black/60 cursor-pointer' />
        </div>
      </div>
    </>
  );
};
