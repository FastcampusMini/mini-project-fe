import React, { useRef, useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
interface TSignUpFieldValues {
  name?: string;
  email?: string;
  password?: string;
  checkPw?: string;
  phone?: string;
  job?: string;
  salary?: number;
  birth?: string;
}

interface IProps {
  text?: string;
  message?: string;
  inputType?: string;
  registerName: Path<TSignUpFieldValues>;
  register: UseFormRegister<TSignUpFieldValues>;
  errorMsg?: any;
  onBlur?: () => void;
}

const NewSalaryField = ({ text = '', registerName, message = '', inputType = 'text', register, errorMsg }: IProps) => {
  return (
    <div className='flex flex-col text-basis text-black80 font-semibold mb-5 relative'>
      <input
        id={registerName}
        className='peer border border-black/20 px-4 py-3 rounded-xl focus:outline-yellow placeholder-transparent'
        type={inputType}
        placeholder={text}
        {...register(registerName)}
      />
      <label
        className='text-black40 bg-white px-1 absolute text-sm left-4 -top-2.5 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black40 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-yellow peer-focus:text-sm peer-focus:bg-white'
        htmlFor={registerName}
      >
        {text}
      </label>
      {errorMsg && (
        <small role='alert' className='text-yellow mt-1 mb-1'>
          {errorMsg.message}
        </small>
      )}
    </div>
  );
};

export default NewSalaryField;
