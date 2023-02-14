import React from "react";
import CartCard from "../../components/CartCard";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Mycart = () => {
  return (
    <article>
      <AiOutlineArrowLeft size="36" className=" cursor-pointer" />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        장바구니
      </h1>
      {[1, 2, 3].map((data, i) => (
        <CartCard key={i} />
      ))}
    </article>
  );
};

export default Mycart;
