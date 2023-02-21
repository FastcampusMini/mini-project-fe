import React from 'react';

interface IConfirmModalProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
  description?: string;
}
const ConfirmModal = ({
  onCancel,
  onConfirm,
  title,
  description,
}: IConfirmModalProps) => {
  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <div className='flex flex-col justify-between w-96 h-auto bg-white rounded-xl items-center p-5 pt-10'>
        <div className='h-full flex flex-col justify-center'>
          <h1 className='font-semibold text-2xl w-full whitespace-normal text-orange text-center my-4'>{title}</h1>
          <p className=' text-black40 text-center font-semibold mb-5 whitespace-pre-line'>{description}</p>
        </div>

        <div className='w-full flex gap-4 h-auto'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded h-14 w-1/2 text-white bg-black40 hover:bg-black60'
          >
            취소
          </button>
          <button
            type='submit'
            onClick={onConfirm}
            className='border rounded h-14 w-1/2 text-white bg-light-orange hover:bg-orange'
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
