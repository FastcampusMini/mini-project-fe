import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import EmptyCart from "../../components/MyCart/EmptyCart";
import Back from "../../components/Navigation/Back";
import OrderListElement from "./../../components/OrderList/OrderListElement";

const OrderList = () => {
  return (
    <article>
      <Back />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        신청 내역
      </h1>
      {/* <EmptyCart>
        <AiOutlineFileSearch className="text-7xl" />
        <p className="text-center font-extrabold text-lg">
          신청내역이 없습니다.
        </p>
      </EmptyCart> */}
      {[1, 2, 3].map((data, i) => (
        <OrderListElement key={i} />
      ))}
    </article>
  );
};

export default OrderList;
