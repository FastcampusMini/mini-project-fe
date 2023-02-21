import React from 'react';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

interface TSignInFieldValues {
  email?: string;
  password: string;
}

interface IProps {
  text: string;
  isDirty: boolean;
  inputType?: string;
  name: Path<TSignInFieldValues>;
  register: UseFormRegister<TSignInFieldValues>;
  errorMsg?: any;
}

const SignInField = ({ text, name, inputType = 'text', register, errorMsg, isDirty, ...others }: IProps) => {
  return (
    <div className='flex flex-col relative'>
      <input
        className='text-black .placeholder-black40 border px-6 py-3 rounded-md mb-8 w-full '
        type={inputType}
        placeholder={text}
        aria-invalid={!isDirty ? undefined : errorMsg ? 'true' : 'false'}
        {...register(name)}
      />
      {errorMsg && (
        <small role='alert' className='text-yellow mt-[-1.75rem] mb-6'>
          {errorMsg.message}
        </small>
      )}
    </div>
  );
};

export default SignInField;
