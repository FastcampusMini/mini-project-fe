import React from 'react';

interface IConfirmBtnProps {
  isValid?: boolean;
  isSubmitting?: boolean;
}

const index = ({ isValid, isSubmitting }: IConfirmBtnProps) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className={`block text-center text-2xl ${
        isValid ? `bg-yellow` : `bg-gray`
      } text-white py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 absolute w-full left-0`}
    >
      확인
    </button>
  );
};

export default index;
