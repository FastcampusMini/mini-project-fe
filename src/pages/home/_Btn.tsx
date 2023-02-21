import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

const Btn = ({ text, ...rest }) => {
  return (
    <button
      className='border w-96 h-16 bg-yellow rounded-md font-bold text-white text-xl flex items-center justify-between px-5 hover:brightness-105'
      {...rest}>
      {text}
      <BiChevronRight size={26} />
    </button>
  );
};

export default Btn;
