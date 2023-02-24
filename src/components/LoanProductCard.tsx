import { ax } from '@/libs/axiosClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface LoanProductCardProps {
  product: IProduct;
}

const LoanProductCard = ({ product }: LoanProductCardProps) => {
  return (
    <>
      <Link to={`/products/financial/${product?.productId}`}>
        <div className='w-full h-42 shadow-md rounded-b-lg rounded-t-3xl border border-black/10 hover:scale-105 transition-all bg-white pb-2 px-4 mt-6'>
          <img
            src={product?.logo}
            className='w-1/4 h-1/4 relative mx-auto rounded-full bg-light-gray/30 -top-5'
          />
          <h3 className='flex justify-center font-bold text-black60 text-lg relative bottom-3'>
            {product?.name}
          </h3>
          <div className='flex justify-end  items-end gap-2'>
            <span className='font-semibold text-yellow'>{product?.rate}%</span>
            <span className='font-semibold text-lg text-orange'>
              ₩{product?.price}만
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default LoanProductCard;
