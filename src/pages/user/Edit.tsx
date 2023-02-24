import React, { useEffect, useState } from 'react';
import Nav from '@components/Nav';
import { useForm, useController } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ax } from '@/libs/axiosClient';
import { useNavigate } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import ConfirmBtn from '../../components/ui/ConfirmBtn';
import { useSelector } from 'react-redux';

const phonReg = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
const options = [
  { value: 1, label: '사무직' },
  { value: 2, label: '개발자' },
  { value: 3, label: '기획자' },
  { value: 4, label: '마케터' },
  { value: 5, label: '디자이너' },
  { value: 6, label: '학생' },
  { value: 7, label: '무직' },
];

interface IEditUserForm {
  job?: string;
  oldPassword: string;
  newPassword?: string;
  newPassword2?: string;
  phone?: string;
  salary?: string;
}

const Edit = () => {
  const { accessToken } = useSelector((state: any) => state.authToken); // 토큰가져오기
  const {
    register,
    formState: { isSubmitting, isValid, errors },
    watch,
    handleSubmit,
    reset,
    getValues,
    setError,
    setValue,
    clearErrors,
    getFieldState,
  } = useForm<IEditUserForm>();

  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: ({ accessToken, payload }: any) =>
      ax.patchUserEdit(accessToken, payload),
  });

  // 비밀번호 두개 일치
  useEffect(() => {
    if (watch().newPassword !== watch().newPassword2) {
      setError('newPassword', { message: '비밀번호가 일치하지 않습니다' });
    } else {
      clearErrors('newPassword');
    }
  }, [watch().newPassword, watch().newPassword2]);

  const onValid = async (data) => {
    const payload = {
      oldPassword: getValues().oldPassword,
      newPassword: getValues().newPassword,
      phone: getValues().phone,
      salary: getValues().salary,
      job: getValues().job,
    };
    // console.log('onValid ', getValues());
    const result = await mutateAsync({ accessToken, payload });
    if (result.code === 200) {
      cogoToast.success(result.message);
      navigate('/user');
    } else {
      console.log(result);
    }

    // console.log(result);
    reset();
  };
  const onInvalid = () => {
    cogoToast.info('양식을 다시 확인해주세요');
    console.log(getValues());
    console.log('errors>>', errors);
  };

  return (
    <div className=''>
      <Nav right='cancel' addClass='mt-5 mx-10' />
      <section className=''>
        <div className='px-5'>
          <h1 className='text-3xl mb-10'>
            <strong>추가정보</strong> 변경하기
          </h1>
          <form
            className='flex flex-col gap-4 '
            onSubmit={handleSubmit(onValid, onInvalid)}>
            <div>
              <span className='font-semibold flex my-2 text-lg'>
                기존 비밀번호 <span className=' text-red'>*</span>
              </span>
              <input
                type='text'
                className='border-black border-[2px] rounded-md w-full h-12 px-4 bg-light-orange/5'
                {...register('oldPassword', {
                  required: '필수입니다.',
                })}
              />
              <span className='text-sm text-orange'>
                {errors.oldPassword?.message}
              </span>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>
                새 비밀번호
              </span>
              <div className='space-y-2'>
                <input
                  type='password'
                  className='border border-gray rounded-md w-full h-12 px-4'
                  {...register('newPassword', {
                    required: '필수입니다.',
                  })}
                />
                <input
                  type='password'
                  className='border border-gray rounded-md w-full h-12 px-4'
                  {...register('newPassword2', {
                    required: '필수입니다.',
                  })}
                />
                <span className='text-sm text-orange'>
                  {errors.newPassword ? '일치하지 않았습니다' : ''}
                </span>
              </div>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>전화번호</span>
              <input
                placeholder="숫자와 '-'를 포함하여 입력하세요"
                type='text'
                className='border border-gray rounded-md w-full h-12 px-4'
                {...register('phone', {
                  required: '필수입니다.',
                  pattern: phonReg,
                })}
              />
              <span className='text-sm text-orange'>
                {errors.phone && '유효한 번호를 입력해주세요'}
              </span>
            </div>

            <div>
              <span className='font-semibold flex my-2 text-lg'>직업</span>
              <select
                className='border border-gray rounded-md w-full h-12 px-4'
                {...register('job')}>
                <option value='개발자'>개발자</option>
                <option value='사무직'>사무직</option>
                <option value='기획자'>기획자</option>
                <option value='마케터'>마케터</option>
                <option value='디자이너'>디자이너</option>
                <option value='학생'>학생</option>
                <option value='무직'>무직</option>
              </select>

              <span className='text-sm text-orange'>{errors.job?.message}</span>
            </div>
            <div>
              <span className='font-semibold flex my-2 text-lg'>연소득</span>
              <div className='flex items-center justify-between gap-2'>
                <input
                  className='border border-gray px-6 py-3 rounded-md w-full'
                  type='number'
                  placeholder={'1000 이상'}
                  {...register('salary', {
                    required: '필수입니다.',
                    valueAsNumber: true,
                    min: {
                      value: 1000,
                      message: '1000만원 이상 입력하세요',
                    },
                  })}
                />
                <span className='basis-1/12 shrink-0'>만원</span>
              </div>
              <span className='text-sm text-orange'>
                {errors.salary?.message}
              </span>
            </div>
            <ConfirmBtn isSubmitting={isSubmitting} isValid={isValid} />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Edit;