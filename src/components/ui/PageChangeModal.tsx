import { useNavigate } from 'react-router-dom';

const PageChangeModal = ({ setPageChange, content, button, route }) => {
  const navigate = useNavigate();
  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <div className='flex flex-col justify-between w-96 h-auto bg-white rounded-xl'>
        <div className='px-8 pt-3 flex flex-col'>
          <div className='flex justify-end'>
            <h1
              onClick={() => setPageChange(false)}
              className='font-bold w-4 cursor-pointer text-lg whitespace-norma'
            >
              X
            </h1>
          </div>
          <p className='text-xl text-black80 text-center font-semibold pt-4 pb-8'>
            {content}
          </p>
        </div>
        <button
          onClick={() => {
            navigate(route);
          }}
          className='w-60 h-16 ml-16 mb-5 border rounded-md text-center text-orange font-semibold'
        >
          {button}
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default PageChangeModal;
