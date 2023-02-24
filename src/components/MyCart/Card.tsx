import { useNavigate } from 'react-router-dom';
const Card = ({ children, data }) => {
  const navigate = useNavigate();
  return (
    <div
      className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg cursor-pointer'
      onClick={() => navigate(`/products/financial/${data.productId}`)}
    >
      <div className='flex items-center'>
        <img className='w-16' src={data.logo} alt='bank_logo' />
        <div className='flex flex-col mx-4 gap-2.5'>
          <h2 className='text-black40 font-semibold'>{data.brand}</h2>
          <h3 className='font-bold text-2xl mb-2'>{data.name}</h3>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Card;
