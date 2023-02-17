import React, { useState } from "react";
import Nav from "@components/Nav";
import { joinNames } from "@libs/utils";

interface IUser {
  email: string;
  name: string;
  age: number;
  phone: string;
  gender: string;
  salary: string;
  job: string;
}

const Edit = () => {
  const [isMale, setIsMale] = useState(true);
  return (
    <>
      <Nav />
      <section className='flex flex-col relative h-auto pb-20 justify-between'>
        <div className='px-5'>
          <h1 className='text-3xl my-10'>
            <strong>추가정보</strong> 변경하기
          </h1>
          <form className='flex flex-col gap-4'>
            <div>
              <span className='font-semibold flex my-2 text-lg'>이름</span>
              <input
                type='text'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>나이</span>
              <input
                type='number'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>

            <div>
              <span className='font-semibold flex my-2 text-lg'>이메일</span>
              <input
                type='email'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>집 주소</span>
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
              <span className='font-semibold flex my-2 text-lg'>전화번호</span>
              <input
                type='text'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>성별</span>
              <div className='h-12 flex'>
                <div
                  onClick={() => setIsMale(true)}
                  className={joinNames(
                    "border border-gray w-1/2 rounded-l-lg flex justify-center items-center text-lg border-r-0 cursor-pointer hover:brightness-105",
                    isMale ? "bg-orange text-white" : " text-black"
                  )}>
                  남성
                </div>
                <div
                  onClick={() => setIsMale(false)}
                  className={joinNames(
                    "border border-gray w-1/2 rounded-r-lg flex justify-center items-center text-lg border-l-0 cursor-pointer hover:brightness-105",
                    isMale ? " text-black" : "bg-orange text-white"
                  )}>
                  여성
                </div>
              </div>
            </div>

            <div>
              <span className='font-semibold flex my-2 text-lg'>직업</span>
              <input
                type='text'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>연봉</span>
              <input
                type='number'
                className='border border-gray rounded-md w-full h-12 text-lg px-4'
              />
            </div>
          </form>
        </div>

        <button className='w-full h-16 bg-yellow text-white font-semibold text-lg text-xl absolute bottom-0'>
          확인
        </button>
      </section>
    </>
  );
};

export default Edit;
