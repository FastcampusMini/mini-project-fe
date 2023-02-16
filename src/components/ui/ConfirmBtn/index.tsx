import React from 'react';

interface IConfirmBtnProps {
  type?: string;
}

const index = ({ type }: IConfirmBtnProps) => {
  const isScroll = type === 'scroll';
  return (
    <button
      type='submit'
      className={`block text-center text-3xl bg-yellow text-white py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 ${
        isScroll ? `w-[calc(100%+5rem)] sticky mx-[-2.5rem]` : `absolute w-full left-0`
      } `}
    >
      확인
    </button>
  );
};

export default index;
