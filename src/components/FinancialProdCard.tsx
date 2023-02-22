import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const FinancialProdCard = ({ data }) => {
  return (
    <Link to={`/products/financial/${data.productId}`} className="flex flex-wrap mb-10 bg-white border border-light-gray rounded-[10px] overflow-hidden">
      <div className="mt-8 flex flex-wrap w-full">
        <span className="pl-8 flex text-xl text-[#888]">
          <img
            className="h-6 mr-2"
            src={data.logo}
            alt="cartItem_logo"
          />        
        </span>
        <span>{data.brand}</span>
        {/* <p className="text-xl">문의 {data.detail}</p> */}
        {/* <button><AiOutlineHeart size='30' /></button> */}
      <h3 className="mt-1 mb-5 pl-16 w-full text-2xl font-bold">{data.name}</h3>
      </div>
      <div className="mb-8 w-full text-2xl text-orange font-bold">
        <div className='mt-1 pl-16 pr-8 flex justify-between items-center'>
          <span className='text-sm text-black40'>예상금리</span> 최저 {data.rate}%
        </div>
        <div className='mt-1 pl-16 pr-8 flex justify-between items-center'>
          <span className='text-sm text-black40'>최대 한도</span> {data.price}
        </div>
      </div>
      <div className="w-full py-4 px-8 bg-black5 text-lg text-[#888]">청년만 가입할 수 있는 적금입니다.</div>
    </Link>
  )
}

export default FinancialProdCard