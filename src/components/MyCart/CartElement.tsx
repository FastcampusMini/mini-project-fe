import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Card from "./Card";

const CartElement = () => {
  return (
    <section className="w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]">
      <Card>
        <div className="flex">
          <div className="flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg">
            <span>최저 3.45%</span>
            <span>300만원</span>
          </div>
          <div className="pointer-events-auto">
            <TiDeleteOutline className="text-4xl text-[#E5E7EB] font-light cursor-pointer" />
          </div>
        </div>
      </Card>
      <div className="flex items-center justify-between px-3 py-1 border border-t-0 border-black5 rounded-b-lg bg-[#f3f3f3] ">
        <p className="font-semibold text-black60">
          청년만 가입할수 있는 적금입니다.
        </p>
        <button className="bg-light-orange px-6 py-3 text-white font-bold rounded">
          신청하기
        </button>
      </div>
    </section>
  );
};

export default CartElement;