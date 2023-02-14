import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-36 text-black60">
      <MdOutlineShoppingCart className="text-7xl" />
      <p className="text-center font-extrabold text-lg">
        장바구니에
        <br />
        담긴 상품이 없습니다.
      </p>
      <Link to="/main">
        <button className="w-60 h-9 mt-5 rounded border-2 border-orange font-semibold text-orange">
          오늘의 추천상품 보기
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
