import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgSearch } from 'react-icons/cg'
import ProductCard from "../../../components/FinancialProdCard";

const Financial = () => {
  const [ isActive, setIsActive ] = useState(false)
  const [ searchWord, setSearchWord ] = useState('')

  const btnActive = () => {
    setIsActive(!isActive)
  }

  return (
    <div>
      <h2 className="my-8 text-3xl font-bold">상품 검색</h2>
      <div className="mb-16">

        <form className="relative flex rounded-[10px] border border-light-gray bg-white overflow-hidden focus:outline-none focus-within:border-yellow focus-within:border-2 valid:border-2 valid:border-yellow">

          <select className="px-4 outline-none">
            <option>전체</option>
            <option>대출</option>
            <option>예금</option>
          </select>

          <input type='text' required className="w-full p-4 pr-16 appearance-none autofill:valid:bg-white focus:border-none active:border-none border-transparent text-xl outline-none" 
          placeholder="원하는 상품을 검색하세요" 
          onChange={(e) => setSearchWord(e.target.value)} />
          <button className="absolute top-0 bottom-0 right-4 text-black40" type='submit'><CgSearch size='34'></CgSearch></button>
        </form>
      </div>

      <h2 className='my-8 text-3xl font-bold'>맞춤 필터링</h2>
      <div className="flex gap-5 mb-16">
        <button className={`aspect-square w-20 border rounded-[10px] text-xl bg-yellow border-yellow text-white font-bold`} onClick={btnActive}>전체</button>
        <button className='aspect-square w-20 rounded-[10px] border border-black5 bg-black5 text-xl'>대출</button>
        <button className='aspect-square w-20 rounded-[10px] border border-black5 bg-black5 text-xl'>예금</button>
      </div>

      <div className="mb-16">
        {/* <div className="my-10 flex justify-center items-center text-black40 font-bold text-lg">등록된 상품이 없습니다.</div> */}
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Financial;
