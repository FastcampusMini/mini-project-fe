import React from 'react';

const Card = ({ children, data }) => {
  return (
    <div className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg'>
      <div className='flex items-center'>
        <img
          className='w-16'
          src='https://ai.esmplus.com/heehyohoo/project/hana.png'
          alt='bank_logo'
        />
        <div className='flex flex-col mx-4 gap-1'>
          <h2 className='text-black40 font-semibold'>{data.brand}</h2>
          <h3 className='font-bold text-3xl mb-2'>{data.name}</h3>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Card;
