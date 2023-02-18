import React from "react";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import TextField from "../../components/SignUp/TextField";
import ConfirmBtn from "../../components/ui/ConfirmBtn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { regex } from "../../libs/utils";
import Select from "react-select";
interface ISignUpForm {
  name: string;
  email: string;
  pw: string;
  checkPw: string;
  phone: string;
  birth: string;
  job: string;
  salary: string;
}

const SignUp = () => {
  const schema = yup.object().shape({
    name: yup.string().min(2).max(10).required(),
    email: yup.string().email().required(),
    pw: yup.string().matches(regex.pw).required(),
    checkPw: yup
      .string()
      .oneOf([yup.ref("pw"), null])
      .required(),
    phone: yup.string().matches(regex.phone).required(),
    job: yup.string().required("Please select job"),
    salary: yup.string().matches(regex.salary).required(),
    birth: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignUpForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { field } = useController({ name: "job", control });
  const { value: jobValue, onChange: jobOnChange, ...restjobField } = field;

  const options = [
    { value: 1, label: "사무직" },
    { value: 2, label: "개발자" },
    { value: 3, label: "기획자" },
    { value: 4, label: "마케터" },
    { value: 5, label: "디자이너" },
    { value: 6, label: "학생" },
    { value: 7, label: "무직" },
  ];

  const submitForm: SubmitHandler<ISignUpForm> = (data) => console.log(data);

  return (
    <>
      <div>
        <p className='text-right mb-7 text-lg font-semibold cursor-pointer'>
          취소
        </p>
        <h1 className='text-3xl mb-10'>
          <span className='font-semibold'>회원 정보</span>
          <span>를 입력해 주세요</span>
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit(submitForm)}>
          <TextField
            text={"이름"}
            name={"name"}
            register={register}
            errorMsg={errors.name && "2글자 이상 입력해주세요."}
          />
          <TextField
            text={"이메일"}
            name={"email"}
            inputType='email'
            register={register}
            errorMsg={errors.email && "이메일 형식이 맞지 않습니다."}
          />
          <TextField
            text={"비밀번호"}
            name={"pw"}
            inputType='password'
            register={register}
            errorMsg={
              errors.pw &&
              "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            }
          />
          <TextField
            text={"비밀번호 확인"}
            name={"checkPw"}
            inputType='password'
            register={register}
            errorMsg={errors.checkPw && "비밀번호가 똑같지 않습니다!"}
          />
          <TextField
            text={"전화번호"}
            name={"phone"}
            register={register}
            errorMsg={errors.phone && "올바른 형식이 아닙니다!"}
          />
          <TextField
            text={"생년원일"}
            name={"birth"}
            inputType='date'
            register={register}
            errorMsg={errors.birth && "생년월일을 입력해주세요."}
          />
          {/* <TextField
            text={'직업'}
            name={'job'}
            register={register}
            errorMsg={errors.job && '올바른 형식이 아닙니다!'}
          /> */}
          <div className='flex flex-col text-xl font-semibold mb-8 relative'>
            <label className='mb-2' htmlFor='job'>
              '직업'
            </label>
            <Select
              placeholder='Select job'
              isClearable
              options={options}
              value={
                jobValue && options.find((option) => option.label === jobValue)
              }
              onChange={(option) => jobOnChange(option && option.label)}
              {...restjobField}
            />
            {errors.job && (
              <span className='absolute bottom-[-1.5rem] text-sm text-yellow'>
                '올바른 형식이 아닙니다!'
              </span>
            )}
          </div>
          <TextField
            text={"연소득"}
            name={"salary"}
            register={register}
            errorMsg={errors.salary && "숫자만 입력해 주세요"}
          />
          <ConfirmBtn type='scroll' />
        </form>
      </div>
    </>
  );
};

export default SignUp;
