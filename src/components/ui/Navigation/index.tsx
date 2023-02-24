import React from 'react';
import { FaSearchDollar } from 'react-icons/fa';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-around items-center text-4xl text-gray py-6 rounded-t-3xl border-t border-black/20 cursor-pointer bottom-0 absolute w-full left-0 bg-white'>
      <FaSearchDollar className='hover:text-yellow' onClick={() => navigate('/products/financial')} />
      <RiShoppingCart2Fill className='hover:text-yellow' onClick={() => navigate('/user/myCart')} />
      <AiFillHome className='hover:text-yellow' onClick={() => navigate('/main')} />
      <AiFillHeart className='hover:text-yellow' onClick={() => navigate('/user/wishlist')} />
      <BsFillPersonFill className='hover:text-yellow' onClick={() => navigate('/user')} />
    </div>
  );
};

export default index;
