import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OrderListElement from "./../../components/OrderList/OrderListElement";

const OrderList = () => {
  return (
    <article>
      <AiOutlineArrowLeft size="36" className=" cursor-pointer" />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        신청 내역
      </h1>
      {[1, 2, 3].map((data, i) => (
        <OrderListElement key={i} />
      ))}
    </article>
  );
};

export default OrderList;
