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

const StepTwo = ({ onSubmit }) => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('이름은 필수 입력입니다.')
      .min(2, '2글자 이상 입력해주세요.')
      .max(10, '10글자 이하로 입력해주세요.'),
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
      <h1 className='text-3xl mb-12'>
        <span className='font-semibold'>회원정보</span>
        <span>를 입력해 주세요</span>
      </h1>

      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-10'>
          <SignUpField
            text={'이름'}
            message={'이름'}
            registerName={'name'}
            register={register}
            errorMsg={errors.name}
          />
        </div>
        <ConfirmBtn isSubmitting={isSubmitting} isValid={isValid} text='다음' />
      </form>
    </div>
  );
};

export default StepTwo;
