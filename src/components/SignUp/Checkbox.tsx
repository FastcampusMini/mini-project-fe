import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface IProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  isDropdown?: boolean;
  onClick?: () => void;
  msg?: string;
}

const Checkbox = ({ label, checked, onChange, isDropdown, onClick, msg }: IProps) => {
  return (
    <div className='text-lg font-semibold text-black80'>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          className='form-checkbox text-yellow border-2 border-black20 rounded-full focus:border-yellow text-3xl'
          checked={checked}
          onChange={onChange}
        />
        <div className='flex justify-between items-center w-full'>
          <label htmlFor='all'>{label}</label>
          {label !== '전체 동의' && !isDropdown ? (
            <RiArrowDownSLine className='text-2xl cursor-pointer' onClick={onClick} />
          ) : (
            label !== '전체 동의' && <RiArrowUpSLine className='text-2xl cursor-pointer' onClick={onClick} />
          )}
        </div>
      </div>
      {isDropdown && (
        <div className='whitespace-pre-wrap leading-loose text-sm ml-11 mt-2 mb-[-1rem] text-yellow'>{msg}</div>
      )}
    </div>
  );
};

export default Checkbox;
