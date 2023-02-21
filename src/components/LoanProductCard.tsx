import { ax } from '@/libs/axiosClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface LoanProductCardProps {
  product: IProduct;
}
interface IProduct {
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: number;
  rate: number;
}
const extractSrcFromTag = (tag) => {
  return tag.split("'")[1];
};
const LoanProductCard = ({ product }: LoanProductCardProps) => {
  return (
    <>
      <Link to={`/products/financial/${product.productId}`}>
        <div className='w-full h-auto shadow-md rounded-lg border border-black/10'>
          <div className='flex h-36 justify-between px-4'>
            <div className='flex items-center'>
              {product.logo ? (
                <img src={product.logo} className='w-8 h-8' />
              ) : (
                <div className='w-8 h-8 rounded-full bg-gray ml-4'></div>
              )}
              <div className='flex flex-col gap-1 mx-4'>
                <span className='font-semibold text-black/50'>
                  {product.brand}
                </span>
                <h4 className='font-bold text-3xl '>{product.name}</h4>
              </div>
            </div>
            <div className='flex flex-col font-bold text-orange items-end justify-center gap-2 mx-4 text-lg'>
              <span>최저 {product.rate} %</span>
              <span>{product.price} 만 원</span>
            </div>
          </div>

          <div className='flex bg-black/5 px-5 justify-between h-14 items-center'>
            <span className='font-semibold text-black/60 text-lg'>
              {product.detail}
            </span>
            <BiChevronRight
              size='30'
              className='text-black/60 cursor-pointer'
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default LoanProductCard;
