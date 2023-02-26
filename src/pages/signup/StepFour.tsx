import React from 'react';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import SignUpField from '../../components/SignUp/SignUpField';
import ConfirmBtn from '../../components/ui/ConfirmBtn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import regex from '../../libs/regex';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import SalaryField from '@/components/SignUp/SalaryField';
import cogoToast from 'cogo-toast';
import { ax } from '@/libs/axiosClient';
import NewSalaryField from '../../components/SignUp/newSalaryField';

interface ISignUpForm {
  name?: string;
  email?: string;
  password?: string;
  checkPw?: string;
  phone?: string;
  birth?: string;
  job?: string;
  salary?: number;
}

const StepFour = ({ onSubmit, formData }) => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    phone: yup
      .string()
      .required('전화번호는 필수 입력입니다.')
      .matches(regex.phone, '잘못된 휴대폰 번호입니다. 숫자와 - 를 포함해서 입력하세요.'),
    job: yup.string().required('직업은 필수 선택입니다.'),
    salary: yup
      .number()
      .required('연봉은 필수 입력입니다.')
      .min(1000, '1000만원 이상 입력해 주세요')
      .typeError('숫자만 입력하세요.'),
    birth: yup.string().required('생년월일은 필수 입력입니다.'),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid, errors },
    control,
  } = useForm<ISignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { field } = useController({ name: 'job', control });
  const { value: jobValue, onChange: jobOnChange, ...restjobField } = field;

  const options = [
    { value: 1, label: '사무직' },
    { value: 2, label: '개발자' },
    { value: 3, label: '기획자' },
    { value: 4, label: '마케터' },
    { value: 5, label: '디자이너' },
    { value: 6, label: '학생' },
    { value: 7, label: '무직' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 13, // border-radius 값
    }),
  };

  return (
    <div className='px-10 py-12 h-full overflow-y-scroll scrollbar-none'>
      <p className='text-right mb-7 text-basis font-semibold cursor-pointer' onClick={() => navigate('/')}>
        취소
      </p>
      <h1 className='text-3xl mb-10'>
        <span className='font-semibold'>회원정보</span>
        <span>를 입력해 주세요</span>
      </h1>

      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-10 mb-10'>
          <SignUpField
            text={'전화번호'}
            registerName={'phone'}
            message={'전화번호를 입력해주세요.'}
            register={register}
            errorMsg={errors.phone}
          />
          <SignUpField
            text={'생년원일'}
            registerName={'birth'}
            message={'생년원일을 입력해주세요.'}
            inputType='date'
            register={register}
            errorMsg={errors.birth}
          />
          <div className='flex flex-col text-basis font-semibold mb-5 relative'>
            <label
              className='z-10 text-black40 bg-white px-1 absolute text-sm left-3 -top-3 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black40 peer-placeholder-shown:top-1 peer-focus:-top-3 peer-focus:text-yellow peer-focus:text-sm peer-focus:bg-white'
              htmlFor='job'
            >
              직업
            </label>
            <Select
              className='text-sm peer focus:outline-yellow placeholder-transparent'
              placeholder='직업을 선택해주세요.'
              isClearable
              styles={customStyles}
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  text: 'orangered',
                  neutral50: '#00000066', // Placeholder color
                  primary25: '#F4AE5C',
                  primary: '#F4AE5C',
                },
                spacing: {
                  ...theme.spacing,
                  baseUnit: 6,
                },
              })}
              value={jobValue && options.find((option) => option.label === jobValue)}
              onChange={(option) => jobOnChange(option && option.label)}
              {...restjobField}
            />
            {errors.job && (
              <small role='alert' className='text-yellow mt-0 mb-1'>
                직업을 선택해주세요.
              </small>
            )}
          </div>
          <NewSalaryField
            text={'연소득'}
            registerName={'salary'}
            inputType='number'
            register={register}
            errorMsg={errors.salary}
          />
        </div>
        <ConfirmBtn isSubmitting={isSubmitting} isValid={isValid} text='다음' />
      </form>
    </div>
  );
};

export default StepFour;
