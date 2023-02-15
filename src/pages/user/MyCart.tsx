import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartElement from "../../components/MyCart/CartElement";
import EmptyCart from "../../components/MyCart/EmptyCart";
import Back from "../../components/Navigation/Back";
import { cartApi, useGetCartQuery } from "../../store/api/cartApi";
console.log("api", cartApi);

const Mycart = () => {
  const { data: cart, isLoading } = cartApi.useGetCartQuery("");
  console.log("cart", cart);
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <article>
      <Back />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        장바구니
      </h1>
      {/* <EmptyCart>
        <MdOutlineShoppingCart className="text-7xl" />
        <p className="text-center font-extrabold text-lg">
          장바구니에
          <br />
          담긴 상품이 없습니다.
        </p>
      </EmptyCart> */}
      {cart?.output?.map((value: ICart, i: number) => (
        <CartElement cartData={value} key={i} />
      ))}
    </article>
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
}

export default Mycart;
