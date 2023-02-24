import { useNavigate } from 'react-router-dom';

const PageChangeModal = ({ setPageChange }) => {
  const navigate = useNavigate();
  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <div className='flex flex-col justify-between w-96 h-auto bg-white rounded-xl'>
        <div className='px-8 pt-3 flex flex-col'>
          <div onClick={() => setPageChange(false)}>
            <h1 className='font-bold text-lg w-full whitespace-norma text-right'>
              X
            </h1>
          </div>
          <p className='text-black60 text-xl text-center font-semibold pt-4 pb-8'>
            상품이 장바구니에 담겼습니다.
          </p>
        </div>
        <button
          onClick={() => {
            navigate('/user/myCart');
          }}
          className='w-60 h-16 ml-16 mb-5 border text-center text-orange font-semibold'
        >
          장바구니 페이지로 이동하기
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default PageChangeModal;
