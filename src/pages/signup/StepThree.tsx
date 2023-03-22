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
  name?: string;
  email?: string;
  password?: string;
  checkPw?: string;
  phone?: string;
  birth?: string;
  job?: string;
  salary?: number;
}

const StepThree = ({ onSubmit }) => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('이메일 형식이 맞지 않습니다.').required('이메일은 필수 입력입니다.'),
    password: yup
      .string()
      .required('비밀번호는 필수 입력입니다.')
      .matches(regex.password, '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'),
    checkPw: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 똑같지 않습니다!')
      .required('비밀번호 확인은 필수 입력입니다.'),
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
        <div className='flex flex-col gap-5 mb-10'>
          <SignUpField
            text={'이메일'}
            // message={'이름 (실명을 입력해주세요.)'}
            registerName={'email'}
            register={register}
            errorMsg={errors.email}
          />
          <SignUpField
            text={'비밀번호'}
            // message={'이름 (실명을 입력해주세요.)'}
            inputType='password'
            registerName={'password'}
            register={register}
            errorMsg={errors.password}
          />
          <SignUpField
            text={'비밀번호 확인'}
            // message={'이름 (실명을 입력해주세요.)'}
            inputType='password'
            registerName={'checkPw'}
            register={register}
            errorMsg={errors.checkPw}
          />
        </div>
        <ConfirmBtn isSubmitting={isSubmitting} isValid={isValid} text='다음' />
      </form>
    </div>
  );
};

export default StepThree;
