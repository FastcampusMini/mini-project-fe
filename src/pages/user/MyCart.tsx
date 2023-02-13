import React from "react";
import CartCard from "../../components/CartCard";

const Mycart = () => {
  return (
    <article>
      <div className="w-10/12 m-auto">
        <h1 className="mb-5 text-3xl font-bold">장바구니</h1>
      </div>
      <CartCard />
    </article>
  );
};

export default Mycart;
