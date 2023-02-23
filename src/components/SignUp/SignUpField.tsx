import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import Select from 'react-select';
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
  text: string;
  inputType?: string;
  name: Path<TSignUpFieldValues>;
  register: UseFormRegister<TSignUpFieldValues>;
  errorMsg?: any;
}

const SignUpField = ({ text, name, inputType = 'text', register, errorMsg, ...others }: IProps) => {
  return (
    <div className='flex flex-col text-xl font-semibold mb-5 relative'>
      <label className='mb-2' htmlFor={name}>
        {text}
      </label>
      <input
        className='text-black .placeholder-black40 border border-black/20 px-6 py-3 rounded-md focus:outline-yellow'
        type={inputType}
        placeholder={text}
        {...register(name)}
      />
      {errorMsg && (
        <small role='alert' className='text-yellow mt-0 mb-1'>
          {errorMsg.message}
        </small>
      )}
    </div>
  );
};

export default SignUpField;
