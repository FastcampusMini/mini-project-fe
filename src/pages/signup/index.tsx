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
      .max(10, '10글자 이하로 입력해주세요.'),
    email: yup.string().email('이메일 형식이 맞지 않습니다.').required('이메일은 필수 입력입니다.'),
    password: yup
      .string()
      .required('비밀번호는 필수 입력입니다.')
      .matches(regex.password, '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'),
    checkPw: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 똑같지 않습니다!')
      .required('비밀번호 확인은 필수 입력입니다.'),
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
      borderRadius: 100, // border-radius 값
    }),
  };

  const submitForm: SubmitHandler<ISignUpForm> = async ({ name, email, password, phone, birth, job, salary }) => {
    // salary = salary * 10000;
    const response = await ax.postRegister({
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
      cogoToast.info(response.message);
      navigate('/signin');
    } else {
      cogoToast.info(response.message);
    }
  };

  return (
    <div className='px-10 py-12 h-full overflow-y-scroll scrollbar-none'>
      <p className='text-right mb-7 text-lg font-semibold cursor-pointer' onClick={() => navigate('/')}>
        취소
      </p>
      <h1 className='text-3xl mb-10'>
        <span className='font-semibold'>회원 정보</span>
        <span>를 입력해 주세요</span>
      </h1>

      <form className='flex flex-col' onSubmit={handleSubmit(submitForm)}>
        <div className='mb-10'>
          <SignUpField
            text={'이름'}
            message={'이름(실명을 입력해주세요.)'}
            name={'name'}
            register={register}
            errorMsg={errors.name}
          />
          <SignUpField
            text={'이메일'}
            message={'이메일을 입력해주세요.'}
            name={'email'}
            inputType='email'
            register={register}
            errorMsg={errors.email}
          />
          <SignUpField
            text={'비밀번호'}
            message={'비밀번호는 8자 이상으로 숫자+영문자+특수문자 조합으로 입력해주세요!'}
            name={'password'}
            inputType='password'
            register={register}
            errorMsg={errors.password}
          />
          <SignUpField
            message={'비밀번호 확인'}
            name={'checkPw'}
            inputType='password'
            register={register}
            errorMsg={errors.checkPw}
          />
          <SignUpField
            text={'전화번호'}
            name={'phone'}
            message={'전화번호를 입력해주세요.'}
            register={register}
            errorMsg={errors.phone}
          />
          <SignUpField
            text={'생년원일'}
            name={'birth'}
            message={'생년원일을 입력해주세요.'}
            inputType='date'
            register={register}
            errorMsg={errors.birth}
          />
          <div className='flex flex-col text-basis font-semibold mb-5 relative'>
            <label className='mb-2' htmlFor='job'>
              직업
            </label>
            <Select
              className='text-sm rounded-full'
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
          <SalaryField
            text={'연소득'}
            name={'salary'}
            message={'연소득을 입력해주세요.'}
            inputType='number'
            register={register}
            errorMsg={errors.salary}
          />
        </div>
        <ConfirmBtn isSubmitting={isSubmitting} isValid={isValid} />
      </form>
    </div>
  );
};

export default SignUp;
