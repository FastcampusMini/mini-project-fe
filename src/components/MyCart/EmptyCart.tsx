import { Link } from 'react-router-dom';

const EmptyCart = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-2 mt-36 text-black60'>
      {children}
      <Link to='/main'>
        <button className='w-60 h-9 mt-5 rounded border-2 border-orange font-semibold text-orange'>
          오늘의 추천상품 보기
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
