import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

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
const SkeletonLoanProductCard = () => {
  return (
    <>
      <div className='w-full h-auto shadow-md rounded-lg border border-black/10'>
        <div className='flex h-36 justify-between px-4'>
          <div className='flex items-center'>
            <div className='w-8 h-8 rounded-full bg-gray/60 ml-4'></div>

            <div className='flex flex-col gap-3 mx-4'>
              <div className=' bg-gray/60 rounded-lg h-5 w-32'></div>
              <div className='bg-gray/60 rounded-full h-8 w-60 '></div>
            </div>
          </div>
          <div className='flex flex-col font-bold text-orange items-end justify-center gap-2 mx-4 text-lg'>
            <div className='bg-gray/60 rounded-full h-5 w-10 '></div>
            <div className='bg-gray/60 rounded-full h-5 w-16 '></div>
          </div>
        </div>

        <div className='flex bg-black/5 px-5 justify-between h-14 items-center'>
          <div className='bg-gray/60 rounded-full h-7 w-60 '></div>
          <ReactLoading
            className='relative bottom-2'
            type='spokes'
            color='#000'
            height={"5%"}
            width={"5%"}
          />
        </div>
      </div>
    </>
  );
};

export default () => (
  <>
    <SkeletonLoanProductCard />
    <SkeletonLoanProductCard />
    <SkeletonLoanProductCard />
  </>
);
