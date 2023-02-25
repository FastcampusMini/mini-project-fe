import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const FinancialProdCard = ({ data }) => {
  return (
    <Link to={`/products/financial/${data.productId}`} className='flex items-center py-8 shadow-md rounded-b-lg rounded-t-3xl border border-black/10 hover:scale-95 transition-all bg-white px-8 mt-6'>
      <img src={data.logo} className="h-20 grow" />
      <div className='w-full text-right'>
        <h3 className="font-bold text-black80 text-2xl">{data.name}</h3>
        <b className="font-semibold text-yellow"><span className='text-black40 text-sm'>예상금리</span> {data.rate}%</b>
        <b className="font-semibold text-lg text-orange"><span className='ml-6 text-black40 text-sm'>최대한도</span> ₩{(data.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 만</b>
      </div>
    </Link>
  )
}

export default FinancialProdCard