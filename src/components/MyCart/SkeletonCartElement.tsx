const SkeletonCartElement = () => {
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <div className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg'>
        <div className='flex items-center'>
          <div className='bg-gray/60 w-16 h-16 rounded-full'></div>
          <div className='flex flex-col mx-4 gap-1'>
            <div className='bg-gray/60 h-5 w-12 rounded-sm'></div>
            <div className='bg-gray/60 h-7 w-32 rounded-sm'></div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col font-bold text-orange items-end gap-2 mx-4 mt-1 text-lg'>
            <div className='bg-gray/60 h-5 w-32 rounded-sm'></div>
            <div className='bg-gray/60 h-7 w-28 rounded-sm'></div>
          </div>
          <div className='pointer-events-auto'>
            <div className='bg-gray/60 w-7 h-7 rounded-full'></div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between px-3 py-1 border border-t-0 border-black5 rounded-b-lg bg-[#f3f3f3] '>
        <div className='bg-gray/60 h-5 w-44 rounded-sm'></div>
        <button className='bg-gray/60 px-14 py-6 text-white font-bold rounded'></button>
      </div>
    </section>
  );
};

export default () => (
  <>
    <SkeletonCartElement />
    <SkeletonCartElement />
    <SkeletonCartElement />
  </>
);
