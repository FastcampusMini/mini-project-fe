import React from "react";
import WishListElement from "../../components/WishList/WishListElement";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WishList = () => {
  return (
    <article>
      <AiOutlineArrowLeft size="36" className=" cursor-pointer" />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        관심상품
      </h1>
      {[1, 2, 3].map((data, i) => (
        <WishListElement key={i} />
      ))}
    </article>
  );
};

export default WishList;
