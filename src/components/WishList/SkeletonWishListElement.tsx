const SkeletonWishListElement = () => {
  return (
    <section className='w-full mb-7 shadow-[0_30px_15px_-25px_rgb(0,0,0,0.3)]'>
      <div className='flex justify-between py-5 pl-5 pr-2 border-solid border border-black/10 rounded-t-lg'>
        <div className='flex items-center'>
          <div className='bg-gray/60 w-16 h-16 rounded-full'></div>
          <div className='flex flex-col mx-4 gap-2.5'>
            <div className='bg-gray/60 h-5 w-12 rounded-sm'></div>
            <div className='bg-gray/60 h-8 w-36 rounded-sm'></div>
          </div>
        </div>
        <div className='flex'>
          <div className='flex flex-col font-bold text-orange items-end gap-4 mx-4 mt-1 text-lg'>
            <div className='bg-gray/60 h-6 m-1 w-24 rounded-sm'></div>
            <div className='bg-gray/60 h-7 w-24 rounded-sm'></div>
          </div>
          <div className='pointer-events-auto flex flex-col gap-3 items-center'>
            <button className='w-24 h-9 rounded bg-gray/60'></button>
            <button className='w-24 h-9 rounded bg-gray/60'></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default () => (
  <>
    <SkeletonWishListElement />
    <SkeletonWishListElement />
    <SkeletonWishListElement />
    <SkeletonWishListElement />
  </>
);
