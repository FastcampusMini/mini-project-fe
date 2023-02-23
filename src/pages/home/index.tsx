// import ConfirmModal from "../../components/ui/ConfirmModal";
import Btn from './_Btn';
import { Link } from 'react-router-dom';

const ema = 't4';
const payload = {
  email: ema,
  password: ema,
};
const Home = () => {
  const handleClick = () => {};
  return (
    <div className='flex flex-col justify-center h-screen'>
      <h1 className='mx-auto text-4xl font-black mb-32'>LoanTech</h1>
      <div className='flex flex-col items-center gap-4'>
        <Link to='/signin'>
          <div>
            <Btn text={'로그인'} />
          </div>
        </Link>
        <Link to='/signup'>
          <Btn text={'회원가입'} onClick={handleClick} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
