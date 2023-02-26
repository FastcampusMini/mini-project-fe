import React from 'react';

interface IConfirmBtnProps {
  isValid?: boolean;
  isSubmitting?: boolean;
  text?: string;
}

const index = ({ isValid, isSubmitting, text = '확인' }: IConfirmBtnProps) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className={`block text-center text-2xl ${
        isValid ? `bg-yellow` : `bg-gray`
      } text-white py-6 rounded-t-3xl cursor-pointer bottom-0 absolute w-full left-0`}
    >
      {text}
    </button>
  );
};

export default index;
