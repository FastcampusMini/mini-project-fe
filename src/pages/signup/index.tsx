import React, { useState } from 'react';
import { useForm, SubmitHandler, useController } from 'react-hook-form';
import SignUpField from '../../components/SignUp/SignUpField';
import ConfirmBtn from '../../components/ui/ConfirmBtn';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { ax } from '@/libs/axiosClient';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

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

const Test = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ISignUpForm>({
    name: '',
    email: '',
    password: '',
    checkPw: '',
    phone: '',
    birth: '',
    job: '',
    salary: 0,
  });

  const handleNext = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (data) => {
    const { phone, birth, job, salary } = data;
    const { name, email, password } = formData;

    const response = await ax.postRegister({ name, email, password, phone, birth, job, salary });
    console.log(response);

    if (response.code === 200) {
      setFormData((prevData) => ({ ...prevData, ...data }));
      setStep((prevStep) => prevStep + 1);
      cogoToast.info(response.message);
    } else {
      cogoToast.info(response.message);
      navigate('/');
    }
  };

  switch (step) {
    case 1:
      return <StepOne onNext={() => setStep(2)} />;
    case 2:
      return <StepTwo onSubmit={handleNext} />;
    case 3:
      return <StepThree onSubmit={handleNext} />;
    case 4:
      return <StepFour onSubmit={handleSubmit} formData={formData} />;
    case 5:
      return <StepFive formData={formData} />;
    default:
      return null;
  }
};

export default Test;
