import React from "react";
import { BsCart2 } from "react-icons/bs";
import Card from "../MyCart/Card";

const WishListElement = ({ cartData, addCart }) => {
  return (
    <section className="w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]">
      <Card data={cartData}>
        <div className="flex">
          <div className="flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg">
            <span>최저 {cartData.rate}%</span>
            <span>{cartData.price}만원</span>
          </div>
          <div className="pointer-events-auto flex flex-col items-center">
            <button className="w-24 h-9 rounded border-2 border-black40 text-sm font-semibold mb-2 text-[#333333]">
              삭제
            </button>
            <button
              onClick={async () =>
                await addCart({
                  basketId: 4,
                  productId: 4,
                  brand: "기업은행",
                  logo: "예시",
                  name: "청년적금4",
                  rate: "5.5",
                  phone: "031-123-1234",
                  datail: "청년만 가입할수 있는 적금입니다.",
                  price: "700",
                  img: "https://ai.esmplus.com/heehyohoo/project/ibk.png",
                })
              }
              className="w-24 h-9 rounded border-2 border-orange text-sm font-semibold mb-2 text-orange"
            >
              <span className="flex items-center justify-center gap-1.5">
                <BsCart2 className="text-base" />
                담기
              </span>
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default WishListElement;
