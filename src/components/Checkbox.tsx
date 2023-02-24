import React, { useState } from 'react';
import { joinNames } from '@libs/utils';

const checkboxClasses = joinNames('form-checkbox');

interface IProps {
  text?: string;
  id?: string;
  checkType: 'checkType1' | 'checkType2';
}
const Checkbox = ({ text, id, checkType }: IProps) => {
  const [checked, setChecked] = useState(false);
  const onChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <label
      htmlFor={id}
      className={joinNames('flex items-center border mycheckbox', checkType)}>
      <input
        id={id}
        name={id}
        type='checkbox'
        className={checkboxClasses}
        checked={checked}
        onChange={onChange}
      />
      <span className='ml-2'>{text}</span>
    </label>
  );
};

export default Checkbox;
