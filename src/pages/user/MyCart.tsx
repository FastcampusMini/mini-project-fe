import React from "react";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartElement from "../../components/MyCart/CartElement";
import EmptyCart from "../../components/MyCart/EmptyCart";
import Back from "../../components/Navigation/Back";
import {
  useGetCartQuery,
  useDeleteCartMutation,
} from "../../store/api/cartApi";

const Mycart = () => {
  const { data: cart, isLoading } = useGetCartQuery("");
  const [deleteCart] = useDeleteCartMutation();
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <article>
        <Back />
        <h1 className='mb-5 pb-3 text-center text-2xl font-bold border-b border-black'>
          장바구니
        </h1>
        {/* 나중에 변경하기 */}
        {cart?.length === 0 || !cart ? (
          <EmptyCart>
            <MdOutlineShoppingCart className='text-7xl' />
            <p className='text-center font-extrabold text-lg'>
              장바구니에
              <br />
              담긴 상품이 없습니다.
            </p>
          </EmptyCart>
        ) : null}
        {/* cart?.data?로 변경하기 */}
        {cart?.map((value: ICart, i: number) => (
          <CartElement cartData={value} deleteCart={deleteCart} key={i} />
        ))}
      </article>
    </>
  );
};

export interface ICart {
  basketId: number;
  productId: number;
  brand: string;
  logo: string;
  name: string;
  rate: string;
  phone: string;
  datail: string;
  price: string;
  img: string;
}

export default Mycart;
