import React, { useState } from "react";
import WishListCard from "./../../components/WishListCard";

const WishList = () => 

  return (
    <article>
      <div className="w-10/12 m-auto">
        <h1 className="mb-5 text-2xl font-bold">관심상품</h1>
      </div>
      <div className="flex flex-wrap">
        {[1, 2, 3].map(() => (
          <WishListCard />
        ))}
      </div>
    </article>
  );
};

export default WishList;
