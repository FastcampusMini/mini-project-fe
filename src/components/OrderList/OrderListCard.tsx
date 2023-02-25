import { useNavigate } from 'react-router-dom';
const OrderListCard = ({ orderList }) => {
  const navigate = useNavigate();
  return (
    <div
      className='flex justify-between py-5 pl-5 border-solid border border-black/10 rounded-t-lg cursor-pointer'
      onClick={() =>
        navigate(`/products/financial/${orderList.originalProductId}`)
      }
    >
      <div className='flex items-center'>
        <img
          className='w-16'
          src={orderList.purchasedProductLogo}
          alt='bank_logo'
        />
        <div className='flex flex-col mx-4 gap-1'>
          <h2 className='text-black40 font-semibold'>
            {orderList.purchasedProductBrand}
          </h2>
          <h3 className='font-bold text-2xl mb-2'>
            {orderList.purchasedProductName}
          </h3>
        </div>
      </div>
      <div className='flex'>
        <div className='flex items-center gap-3 justify-center font-semibold mx-4 text-lg'>
          <p>처리 준비중</p>
        </div>
        <div className='pointer-events-auto flex flex-col items-center'></div>
      </div>
    </div>
  );
};

export default OrderListCard;
