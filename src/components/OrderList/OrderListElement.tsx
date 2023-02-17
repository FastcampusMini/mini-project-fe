import React from "react";
import { BsCart2 } from "react-icons/bs";
import Card from "../MyCart/Card";

const OrderListElement = ({ cartData }) => {
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <Card data={cartData}>
        <div className='flex'>
          <div className='flex items-center gap-3 justify-center font-semibold mx-4 text-lg'>
            <p>처리 준비중</p>
            <button className='w-24 h-9 rounded border-2 border-orange text-sm font-semibold text-orange'>
              신청취소
            </button>
          </div>
          <div className='pointer-events-auto flex flex-col items-center'></div>
        </div>
      </Card>
    </section>
  );
};

export default OrderListElement;
