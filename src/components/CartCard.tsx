import React from "react";
import { TiDeleteOutline } from "react-icons/ti";

const CartCard = () => {
  return (
    <section className="mb-8 w-10/12 m-auto">
      <div className="flex justify-between py-5 pl-5 pr-2 border-solid border border-light-gray rounded-t-xl">
        <div className="flex items-center ">
          <img
            className="w-20 h-8 mt-1.5 mr-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/KB_logo.svg/220px-KB_logo.svg.png"
            alt="cartItem_logo"
          />
        </div>
        <div>
          <h2 className="text-[#808080] mb-2">국민은행</h2>
          <h3 className="font-bold text-xl mb-2">청년적금</h3>
          <h4 className="text-sm">문의 031-123-1234</h4>
        </div>
        <div className="ml-12 flex items-center ">
          <p className="text-yellow font-black text-xl">최저 1.5% </p>
        </div>
        <div className="pointer-events-auto">
          <TiDeleteOutline className="text-4xl text-[#E5E7EB] font-light cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 border border-t-0 border-light-gray rounded-b-xl bg-[#f3f3f3] ">
        <p className="text-[#808080] font-semibold">
          청년만 가입할수 있는 적금입니다.
        </p>
        <button className="bg-yellow px-6 py-3 text-white font-bold rounded-lg">
          신청하기
        </button>
      </div>
    </section>
  );
};

export default CartCard;
