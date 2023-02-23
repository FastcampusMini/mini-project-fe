// import ConfirmModal from "../../components/ui/ConfirmModal";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center h-screen'>
      <div className='flex flex-col mb-32 gap-8'>
        <h1 className='mx-auto text-5xl font-black'>
          Welcome to <em className='text-orange'>LoanTech</em>
        </h1>
        <p className='text-center text-black40 font-semibold'>
          이제껏 경험 못 했던 쉽고 편리한 금융 서비스
        </p>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <button
          className='border w-11/12 h-16 bg-yellow rounded-full text-white text-xl flex items-center justify-center px-5 hover:brightness-105'
          onClick={() => navigate('/signin')}>
          Sign in
        </button>

        <button
          className='border w-11/12 h-16 bg-yellow/5 rounded-full text-yellow text-xl flex items-center justify-center px-5 hover:brightness-95'
          onClick={() => navigate('/signup')}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Home;
