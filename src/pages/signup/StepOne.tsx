import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import NextBtn from '@/components/SignUp/NextBtn';
import Checkbox from '@/components/SignUp/Checkbox';

const StepOne = ({ onNext }) => {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState([false, false, false]);
  const [openDropdown, setOpenDropdown] = useState([false, false, false]);

  const dropdown1 = '서비스 이용약관 동의\n개인정보 수집 및 이용 동의';
  const dropdown2 = '론테크머니 개인정보 제 3자 동의\n개인(신용) 정보 제3자 제공동의';
  const dropdown3 = '제휴/마케팅 정보 수신 동의\n';

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
    setIsChecked([!allChecked, !allChecked, !allChecked]);
  };

  const handleChecked = (index) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !isChecked[index];
    setIsChecked(newIsChecked);

    if (newIsChecked.every((check) => check)) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleDropdown = (index) => {
    const newOpenDropdown = [...openDropdown];
    newOpenDropdown[index] = !openDropdown[index];
    setOpenDropdown(newOpenDropdown);
  };

  return (
    <div className='px-10 py-12 h-full overflow-y-scroll scrollbar-none'>
      <p className='text-right mb-7 text-basis font-semibold cursor-pointer' onClick={() => navigate('/')}>
        취소
      </p>
      <h1 className='flex flex-col text-3xl mb-14'>
        <div className='flex gap-1'>
          <span className='font-semibold'>만나서 반가워요</span>
          <span className='animate-wave'>👋</span>
        </div>
        <span>가입약관을 확인해 주세요</span>
      </h1>

      <form className='flex flex-col gap-8'>
        <Checkbox label='전체 동의' checked={allChecked} onChange={handleAllChecked} />
        <Checkbox
          label='론테크 서비스 이용 동의(필수)'
          checked={isChecked[0]}
          onChange={() => handleChecked(0)}
          isDropdown={openDropdown[0]}
          onClick={() => handleDropdown(0)}
          msg={dropdown1}
        />
        <Checkbox
          label='개인정보 수집 및 이용안내(선택)'
          checked={isChecked[1]}
          onChange={() => handleChecked(1)}
          isDropdown={openDropdown[1]}
          onClick={() => handleDropdown(1)}
          msg={dropdown2}
        />
        <Checkbox
          label='마케팅 정보 수신 동의(선택)'
          checked={isChecked[2]}
          onChange={() => handleChecked(2)}
          isDropdown={openDropdown[2]}
          onClick={() => handleDropdown(2)}
          msg={dropdown3}
        />
        <button
          type='button'
          disabled={!isChecked[0]}
          onClick={onNext}
          className={`${
            isChecked[0] ? `bg-yellow` : `bg-gray`
          } block text-center text-2xl text-white py-6 rounded-t-3xl cursor-pointer bottom-0 absolute w-full left-0`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default StepOne;
