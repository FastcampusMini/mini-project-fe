const AlertModal = ({ setAlertModal, content }) => {
  return (
    <div className='fixed w-screen h-screen bg-black40 left-0 top-0 flex justify-center items-center z-10'>
      <div className='flex flex-col justify-between w-96 h-auto bg-white rounded-xl'>
        <div className='px-8 pt-7 flex flex-col'>
          <h1 className='font-semibold text-lg w-full whitespace-norma'>
            알림
          </h1>
          <p className='text-black60 text-lg text-center font-semibold pt-6 pb-10'>
            {content}
          </p>
        </div>

        <div className='w-full h-16 flex gap-4 border border-black5'>
          <button
            onClick={() => {
              setAlertModal(false);
            }}
            className='w-full h-full text-center text-orange font-semibold'
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
