import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const FinancialProdCard = (props: Props) => {
  return (
    <Link to='/products/financial/:financialId' className="flex flex-wrap justify-between items-center mb-10 bg-white border border-light-gray rounded-[10px] overflow-hidden">
      <div className="my-5 pl-8">
        <p className="flex items-center text-xl text-[#888]">
          <img
            className="w-20 mr-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/KB_logo.svg/220px-KB_logo.svg.png"
            alt="cartItem_logo"
          />국민은행</p>
        <h3 className="my-5 text-2xl font-bold">청년적금</h3>
        <p className="text-xl">문의 031-123-1234</p>
      </div>
      <div className="pr-12 text-2xl text-orange font-bold">최저 1.5%</div>
      <div className="w-full py-4 px-8 bg-black5 text-xl text-[#888]">청년만 가입할 수 있는 적금입니다.</div>
    </Link>
  )
}

export default FinancialProdCard