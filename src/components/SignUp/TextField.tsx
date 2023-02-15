import React from 'react';

const TextField = ({ text, name, inputType = 'text', register }) => {
  return (
    <div className='flex flex-col text-lg font-semibold mb-8'>
      <label className='mb-1' htmlFor={name}>
        {text}
      </label>
      <input
        className='text-gray border px-6 py-3 rounded-md'
        type={inputType}
        placeholder={text}
        {...register(name)}
      />
    </div>
  );
};

export default TextField;
