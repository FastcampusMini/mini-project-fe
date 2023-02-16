import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import EmptyCart from "../../components/MyCart/EmptyCart";
import Back from "../../components/Navigation/Back";
import OrderListElement from "./../../components/OrderList/OrderListElement";
import { useGetCartQuery } from "../../store/api/cartApi";
import { ICart } from "./MyCart";

const OrderList = () => {
  const { data: cart, isLoading } = useGetCartQuery("");
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <article>
      <Back />
      <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
        신청 내역
      </h1>
      {cart?.length === 0 || !cart ? (
        <EmptyCart>
          <AiOutlineFileSearch className='text-7xl' />
          <p className='text-center font-extrabold text-lg'>
            신청내역이 없습니다.
          </p>
        </EmptyCart>
      ) : null}
      {cart?.map((value: ICart, i: number) => (
        <OrderListElement cartData={value} key={i} />
      ))}
    </article>
  );
};

export default OrderList;
