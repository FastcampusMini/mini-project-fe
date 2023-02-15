import React from 'react';

const index = ({ type }) => {
  const isScroll = type === 'scroll';
  return (
    <div
      className={`flex justify-center items-center text-3xl bg-yellow text-white py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 ${
        isScroll ? `max-w-screen-sm sticky mx-[-2.5rem]` : `absolute w-full left-0`
      } `}
    >
      확인
    </div>
  );
};

export default index;
