import React, { useState } from "react";
import WishListCard from "./../../components/WishListCard";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WishList = () => {
  return (
    <article>
      <AiOutlineArrowLeft size="36" className=" cursor-pointer" />
      <h1 className="mb-5 pb-3 text-center text-2xl font-bold border-b border-black">
        관심상품
      </h1>
      <div className="flex flex-wrap">
        {[1, 2, 3].map((data, i) => (
          <WishListCard key={i} />
        ))}
      </div>
    </article>
  );
};

export default WishList;
