import React from "react";

const ConfirmModal = () => {
  return (
    <div className='fixed w-screen h-screen bg-black/30 left-0 top-0 flex justify-center items-center'>
      <div className='flex flex-col justify-between w-96 h-96 bg-white rounded items-center p-4'>
        <div className='h-auto'>
          <h1 className='font-semibold text-2xl w-full whitespace-normal border'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            asperiores in eos
          </h1>
          <p className='border'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            eius, inventore magni sit quibusdam harum voluptatibus id labore
            dolor in pariatur recusandae expedita sequi eaque error aperiam,
            deserunt doloribus quasi.
          </p>
        </div>

        <div className='border w-full flex gap-4 h-auto'>
          <button className='border rounded h-10 w-1/2'>취소</button>
          <button className='border rounded h-10 w-1/2'>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
