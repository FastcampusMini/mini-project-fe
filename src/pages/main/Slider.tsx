import useComponentSize from '@/libs/hooks/useComponentSize';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdRecommend } from 'react-icons/md';
interface IProps {
  products: IProduct[];
  fetchNextPage: any;
}

export default function Slider({ products, fetchNextPage }: IProps) {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [componentRef, { width, height }] = useComponentSize();
  const [index, setIndex] = useState(0);

  const slidePrev = () => {
    if (index === 0) return;
    setPosition(position + width);
    setIndex((prev) => prev - 1);
  };
  const slideNext = () => {
    const crit = Math.floor(products.length / 3);
    if (index >= crit - 1) {
      fetchNextPage();
    }
    // if (index === 3) return;
    setPosition(position - width);
    setIndex((prev) => prev + 1);
  };

  return (
    <div className='relative overflow-hidden flex flex-col' ref={componentRef}>
      <div
        className='flex transition-transform duration-500 ease-in-out w-full h-auto'
        style={{ transform: `translateX(${position}px)` }}>
        {products.map((product: IProduct, index) => (
          <div
            onClick={() => navigate(`/products/financial/${product.productId}`)}
            key={index}
            className={`w-[${
              width / 4
            }px] flex-shrink-0 p-4 bg-gray-200 shadow-lg rounded-lg m-2 flex items-center gap-3 relative hover:cursor-pointer hover:scale-95 transition-all`}>
            <img src={product.logo} alt='' className='w-4 h-4' />
            <div className='flex flex-col'>
              <span className='font-semibold'>{product.name}</span>
              <span className='text-sm font-semibold text-red'>
                {product.price}만({product.rate}%)
              </span>
            </div>
            <MdRecommend size={20} className='absolute left-0 top-3' />
          </div>
        ))}
      </div>
      <div className='flex absolute top-7 w-full justify-between'>
        <BsChevronLeft
          onClick={slidePrev}
          size={30}
          className='bg-light-gray/50 cursor-pointer rounded-full p-1 hover:bg-light-gray'
        />
        <BsChevronRight
          onClick={slideNext}
          size={30}
          className='bg-light-gray/50 cursor-pointer rounded-full p-1 hover:bg-light-gray'
        />
      </div>
    </div>
  );
}
