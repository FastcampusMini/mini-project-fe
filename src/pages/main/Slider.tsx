import useComponentSize from '@/libs/hooks/useComponentSize';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdRecommend } from 'react-icons/md';
import SlideCard from './SlideCard';
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
    <div
      className='relative overflow-hidden flex flex-col pb-5'
      ref={componentRef}>
      <div
        className='flex transition-transform duration-500 ease-in-out w-auto h-auto gap-3'
        style={{ transform: `translateX(${position}px)` }}>
        {products.map((product: IProduct, index) => (
          <SlideCard product={product} />
        ))}
      </div>
      <div className='flex absolute bottom-0 w-full justify-between px-4'>
        <BsChevronLeft
          onClick={slidePrev}
          size={40}
          className='bg-light-gray/50 cursor-pointer rounded-full p-1 hover:bg-light-gray'
        />
        <BsChevronRight
          onClick={slideNext}
          size={40}
          className='bg-light-gray/50 cursor-pointer rounded-full p-1 hover:bg-light-gray'
        />
      </div>
    </div>
  );
}
