import React from 'react';

interface IConfirmBtnProps {
  disabled: boolean;
  onClick?: () => void;
}

const NextBtn = ({ disabled, onClick }: IConfirmBtnProps) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      // onClick={onClick}
      className={`${
        !disabled ? `bg-yellow` : `bg-gray`
      } block text-center text-2xl text-white py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 absolute w-full left-0`}
    >
      다음
    </button>
  );
};

export default NextBtn;
