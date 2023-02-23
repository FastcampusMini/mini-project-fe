import ReactLoading from 'react-loading';

const SkeletonOrderListElement = () => {
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <div className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg'>
        <div className='flex items-center'>
          <ReactLoading type='spokes' color='gray' height={50} width={50} />
          <div className='flex flex-col mx-4 gap-1'>
            <div className='bg-gray/60 h-5 w-12 rounded-sm'></div>
            <div className='bg-gray/60 h-8 w-36 rounded-sm'></div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex items-center gap-3 justify-center font-semibold mx-4 text-lg'>
            <div className='bg-gray/60 h-7 w-24 rounded-sm'></div>
            <button className='w-24 h-9 rounded bg-gray/60'></button>
          </div>
          <div className='pointer-events-auto flex flex-col items-center'></div>
        </div>
      </div>
    </section>
  );
};

export default () => (
  <>
    <SkeletonOrderListElement />
    <SkeletonOrderListElement />
    <SkeletonOrderListElement />
    <SkeletonOrderListElement />
    <SkeletonOrderListElement />
  </>
);
