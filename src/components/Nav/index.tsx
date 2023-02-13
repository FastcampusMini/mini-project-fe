import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const Nav = () => {
  return (
    <nav className=' h-20 flex justify-between items-center px-7'>
      <AiOutlineArrowLeft size='36' className=' cursor-pointer' />
      <AiOutlineArrowRight size='36' className='cursor-pointer' />
    </nav>
  );
};

export default Nav;
