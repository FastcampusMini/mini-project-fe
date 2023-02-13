import React from "react";

const Edit = () => {
<<<<<<< HEAD
  return <div>Edit</div>;
=======
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
>>>>>>> 88c9c981f6784591a46450633e0d6d1b853ef116
};

export default Edit;
