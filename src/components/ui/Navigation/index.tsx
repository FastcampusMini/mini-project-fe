import React, { useState } from 'react';
import { FaSearchDollar } from 'react-icons/fa';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface IProps {
  pathname?: any;
}

const index = ({ pathname }: IProps) => {
  const navigate = useNavigate();

  const handleIconClick = (pageName) => {
    navigate(pageName);
  };

  return (
    <div className='flex justify-around items-center text-4xl text-gray py-6 rounded-t-3xl border-t border-black/20 cursor-pointer bottom-0 absolute w-full left-0 bg-white'>
      <FaSearchDollar
        className={pathname === '/products/financial' ? 'text-yellow' : 'hover:text-yellow/60'}
        onClick={() => handleIconClick('/products/financial')}
      />
      <RiShoppingCart2Fill
        className={pathname === '/user/myCart' ? 'text-yellow' : 'hover:text-yellow/60'}
        onClick={() => handleIconClick('/user/myCart')}
      />
      <AiFillHome
        className={pathname === '/main' ? 'text-yellow' : 'hover:text-yellow/60'}
        onClick={() => handleIconClick('/main')}
      />
      <AiFillHeart
        className={pathname === '/user/wishlist' ? 'text-yellow' : 'hover:text-yellow/60'}
        onClick={() => handleIconClick('/user/wishlist')}
      />
      <BsFillPersonFill
        className={pathname === '/user' ? 'text-yellow' : 'hover:text-yellow/60'}
        onClick={() => handleIconClick('/user')}
      />
    </div>
  );
};

export default index;
