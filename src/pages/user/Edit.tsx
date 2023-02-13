import React from "react";

const Edit = () => {
  return (
    <section className='flex flex-col px-5 h-screen'>
      <h1 className='text-3xl'>
        <strong>추가정보</strong> 변경하기
      </h1>
      <form className='flex flex-col gap-4'>
        <div>
          <span className='font-semibold'>이메일</span>
          <input
            type='email'
            className='border border-gray rounded-md w-full h-12 text-lg px-4'
          />
        </div>
        <div>
          <span className='font-semibold'>집 주소</span>
          <input
            type='text'
            className='border border-gray rounded-md w-full h-12 text-lg px-4 my-2'
          />
          <input
            type='text'
            className='border border-gray rounded-md w-full h-12 text-lg px-4'
          />
        </div>
        <div>
          <span className='font-semibold'>직업</span>
          <input
            type='email'
            className='border border-gray rounded-md w-full h-12 text-lg px-4'
          />
        </div>
      </form>
    </section>
  );
};

export default Edit;
