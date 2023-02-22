import React from 'react';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import SignUpField from '../../components/SignUp/SignUpField';
import ConfirmBtn from '../../components/ui/ConfirmBtn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import regex from '../../libs/regex';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/authApi';
import SalaryField from '@/components/SignUp/SalaryField';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  checkPw: string;
  phone: string;
  birth: string;
  job: string;
  salary: number;
}

const SignUp = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('이름은 필수 입력입니다.')
      .min(2, '2글자 이상 입력해주세요.')
      .max(10),
    email: yup
      .string()
      .email('이메일 형식이 맞지 않습니다.')
      .required('이메일은 필수 입력입니다.'),
    password: yup
      .string()
      .required('비밀번호는 필수 입력입니다.')
      .matches(
        regex.password,
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      ),
    checkPw: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 똑같지 않습니다!')
      .required('비밀번호 확인은 필수 입력입니다.'),
    phone: yup
      .string()
      .required('전화번호는 필수 입력입니다.')
      .matches(
        regex.phone,
        '잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.'
      ),
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

  const submitForm: SubmitHandler<ISignUpForm> = async ({
    name,
    email,
    password,
    phone,
    birth,
    job,
    salary,
  }) => {
    salary = salary * 10000;
    const response = await signUp({
      name,
      email,
      password,
      phone,
      birth,
      job,
      salary,
    });
    console.log(response);
    if (response.code === 200) {
      // alert(response.message);
      navigate('/signin');
    } else {
      // alert(response.message);
    }
  };

  return (
    <>
      <div>
        <p
          className='text-right mb-7 text-lg font-semibold cursor-pointer'
          onClick={() => navigate('/')}>
          취소
        </p>
        <h1 className='text-3xl mb-10'>
          <span className='font-semibold'>회원 정보</span>
          <span>를 입력해 주세요</span>
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit(submitForm)}>
          <SignUpField
            text={'이름'}
            name={'name'}
            register={register}
            errorMsg={errors.name}
          />
          <SignUpField
            text={'이메일'}
            name={'email'}
            inputType='email'
            register={register}
            errorMsg={errors.email}
          />
          <SignUpField
            text={'비밀번호'}
            name={'password'}
            inputType='password'
            register={register}
            errorMsg={errors.password}
          />
          <SignUpField
            text={'비밀번호 확인'}
            name={'checkPw'}
            inputType='password'
            register={register}
            errorMsg={errors.checkPw}
          />
          <SignUpField
            text={'전화번호'}
            name={'phone'}
            register={register}
            errorMsg={errors.phone}
          />
          <SignUpField
            text={'생년원일'}
            name={'birth'}
            inputType='date'
            register={register}
            errorMsg={errors.birth}
          />
          <div className='flex flex-col text-xl font-semibold mb-5 relative'>
            <label className='mb-2' htmlFor='job'>
              직업
            </label>
            <Select
              placeholder='직업을 선택해주세요.'
              isClearable
              options={options}
              value={
                jobValue && options.find((option) => option.label === jobValue)
              }
              onChange={(option) => jobOnChange(option && option.label)}
              {...restjobField}
            />
            {errors.job && (
              <small role='alert' className='text-yellow mt-0 mb-1'>
                직업을 선택해주세요.
              </small>
            )}
          </div>
          <SalaryField
            text={'연소득'}
            name={'salary'}
            register={register}
            errorMsg={errors.salary}
          />
          <ConfirmBtn
            type='scroll'
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
