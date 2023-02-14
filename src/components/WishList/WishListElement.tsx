import React from "react";
import { BsCart2 } from "react-icons/bs";
import Card from "../MyCart/Card";

const WishListElement = () => {
  return (
    <section className="w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]">
      <Card>
        <div className="flex">
          <div className="flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg">
            <span>최저 3.45%</span>
            <span>300만원</span>
          </div>
          <div className="pointer-events-auto flex flex-col items-center">
            <button className="w-24 h-9 rounded border-2 border-black40 text-sm font-semibold mb-2 text-[#333333]">
              삭제
            </button>
            <button className="w-24 h-9 rounded border-2 border-orange text-sm font-semibold mb-2 text-orange">
              <span className="flex items-center justify-center gap-1.5">
                <BsCart2 className="text-base" />
                담기
              </span>
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default WishListElement;
