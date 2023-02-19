import React, { useEffect, useState } from "react";
import Nav from "@components/Nav";
import { joinNames } from "@libs/utils";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useForm } from "react-hook-form";

const phonReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
interface IEditUserForm {
  job: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  phone: string;
  salary: string;
}

const Edit = () => {
  const [isMale, setIsMale] = useState(true);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    getValues,
    setError,
    setValue,
    clearErrors,
    getFieldState,
  } = useForm<IEditUserForm>();
  // console.log(watch());

  useEffect(() => {
    if (watch().newPassword !== watch().newPassword2) {
      setError("newPassword", { message: "비밀번호가 일치하지 않습니다" });
    } else {
      clearErrors("newPassword");
    }
    console.log("errors>>", errors.newPassword);
  }, [watch().newPassword, watch().newPassword2]);

  const onValid = () => {
    console.log("유효! ", getValues());
  };
  const onInvalid = () => {
    console.log(getValues());
    console.log("errors>>", errors);
  };
  return (
    <>
      <Nav left='arrow' right='arrow' />
      <section className='flex flex-col relative h-auto pb-20 justify-between'>
        <div className='px-5'>
          <h1 className='text-3xl mb-10'>
            <strong>추가정보</strong> 변경하기
          </h1>
          <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(onValid, onInvalid)}>
            <div>
              <span className='font-semibold flex my-2 text-lg'>
                기존 비밀번호 <span className=' text-red'>*</span>
              </span>
              <input
                type='text'
                className='border border-black border-[2px] rounded-md w-full h-12 px-4'
                {...register("oldPassword", {
                  required: "필수입니다.",
                })}
              />
              <span className='text-sm text-orange'>
                {errors.oldPassword?.message}
              </span>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>
                새 비밀번호
              </span>
              <div className='space-y-2'>
                <input
                  type='text'
                  className='border border-gray rounded-md w-full h-12 px-4'
                  {...register("newPassword")}
                />
                <input
                  type='text'
                  className='border border-gray rounded-md w-full h-12 px-4'
                  {...register("newPassword2")}
                />
                <span className='text-sm text-orange'>
                  {errors.newPassword ? "일치하지 않았습니다" : ""}
                </span>
              </div>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>
                전화번호('-'빼고 입력하세요)
              </span>
              <input
                type='text'
                className='border border-gray rounded-md w-full h-12 px-4'
                {...register("phone", {
                  // onChange: (event) => {
                  //   const _value = getValues().phone;
                  //   console.log(_value);
                  //   setValue("phone", _value.replace(/[^0-9]/g, ""));
                  // },
                  pattern: phonReg,
                  setValueAs: (value) => value.replaceAll("-", ""),
                })}
              />
              <span className='text-sm text-orange'>
                {errors.phone && "유효하지 않은 번호입니다"}
              </span>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>연소득</span>
              <div className='flex items-center justify-between gap-2'>
                <input
                  className='border border-gray px-6 py-3 rounded-md w-full'
                  type='number'
                  placeholder={"연소득"}
                  {...register("salary", {
                    min: {
                      value: 1000,
                      message: "1000만원 이상 입력하세요",
                    },
                  })}
                />
                <span className='basis-1/12 shrink-0'>만원</span>
              </div>
              <span className='text-sm text-orange'>
                {errors.salary?.message}
              </span>
            </div>
            <button className='w-full h-16 bg-yellow text-white font-semibold text-lg text-xl bottom-0 mt-10 mb-5'>
              확인
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit;
