import React from "react";
import { BiChevronRight } from "react-icons/bi";

interface LoanProductCardProps {}

const LoanProductCard = () => {
  return (
    <>
      <div className='w-full h-auto shadow-md rounded-lg border border-black/10'>
        <div className='flex h-36 justify-between px-4'>
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-gray ml-4'></div>
            <div className='flex flex-col gap-1 mx-4'>
              <span className='font-semibold text-black/50'>하나은행</span>
              <h4 className='font-bold text-3xl '>핀크 생활비 대출</h4>
            </div>
          </div>
          <div className='flex flex-col font-bold text-orange items-end justify-center gap-2 mx-4 text-lg'>
            <span>최저 3.45%</span>
            <span>300만원</span>
          </div>
        </div>

        <div className='flex bg-black/5 px-5 justify-between h-14 items-center'>
          <span className='font-semibold text-black/60 text-lg'>
            가입한 상품
          </span>
          <BiChevronRight size='30' className='text-black/60 cursor-pointer' />
        </div>
      </div>
    </>
  );
};

export default LoanProductCard;
