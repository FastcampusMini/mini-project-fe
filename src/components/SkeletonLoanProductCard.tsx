const SkeletonLoanProductCard = () => {
  return (
    <>
      <div className='w-full h-42 shadow-md rounded-b-lg rounded-t-3xl border border-black/10 hover:scale-95 transition-all bg-white pb-2 px-4 mt-6'>
        <div className='w-12 h-12 mx-auto  relative  -top-5 bg-light-gray rounded-full'></div>
        <h3 className='flex justify-center font-bold text-black60 text-lg relative bottom-3 h-7 rounded-xl w-32 mx-auto mt-2 bg-light-gray'></h3>
        <div className='flex justify-end  items-end gap-2'>
          <span className='rounded-xl bg-light-gray w-10 h-6 text-yellow'></span>
          <span className='rounded-xl bg-light-gray w-16 h-6'></span>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoanProductCard;
