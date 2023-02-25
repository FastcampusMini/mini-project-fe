import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
interface TSignUpFieldValues {
  name: string;
  email: string;
  password: string;
  checkPw: string;
  phone: string;
  job: string;
  salary: number;
  birth: string;
}

interface IProps {
  text?: string;
  message?: string;
  inputType?: string;
  name: Path<TSignUpFieldValues>;
  register: UseFormRegister<TSignUpFieldValues>;
  errorMsg?: any;
}

const SignUpField = ({ text = '', name, message = '', inputType = 'text', register, errorMsg }: IProps) => {
  return (
    <div className='flex flex-col text-basis text-black80 font-semibold mb-5 relative'>
      <label className='mb-2' htmlFor={name}>
        {text}
      </label>
      <input
        className='text-black .placeholder-black40 placeholder:italic placeholder:text-slate-400 border text-sm border-black/20 px-6 py-3 rounded-full focus:outline-yellow'
        type={inputType}
        placeholder={message}
        {...register(name)}
      />
      {errorMsg && (
        <small role='alert' className='text-yellow mt-1 mb-1'>
          {errorMsg.message}
        </small>
      )}
    </div>
  );
};

export default SignUpField;
