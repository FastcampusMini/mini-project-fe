import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const WishListCard = () => {
  const [wish, setWish] = useState(true);

  return (
    <section className="ml-11 mb-4 border-solid border border-light-gray rounded-lg">
      <div className="flex flex-col justify-center items-center w-56 pt-10">
        <div>
          <img
            className="w-20 h-8 m-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/KB_logo.svg/220px-KB_logo.svg.png"
            alt="cartItem_logo"
          />
        </div>
        <h1 className="mt-5 text-2xl text-[#808080] font-extrabold">
          국민은행
        </h1>
        <h2 className="mt-2 text-xl text-yellow font-bold">청년적금</h2>
      </div>
      <div
        onClick={() => {
          setWish(!wish);
        }}
        className="cursor-pointer flex justify-end m-5"
      >
        {wish ? (
          <FaHeart className="text-2xl text-orange" />
        ) : (
          <FiHeart className="text-2xl text-orange" />
        )}
      </div>
    </section>
  );
};

export default WishListCard;
