import React from 'react'

type Props = {}

const FinancialProdCard = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-10 bg-white border border-light-gray rounded-[10px] shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)] overflow-hidden">
          <div className="my-5 pl-8">
            <p className="flex items-center text-xl text-[#888]"><img src='#'></img>국민은행</p>
            <h3 className="my-5 text-2xl">청년적금</h3>
            <p className="text-xl">문의 031-123-1234</p>
          </div>
          <div className="pr-12 text-2xl text-orange">최저 1.5%</div>
          <div className="w-full py-4 px-8 bg-light-gray text-xl text-[#888]">청년만 가입할 수 있는 적금입니다.</div>
        </div>
  )
}

export default FinancialProdCard