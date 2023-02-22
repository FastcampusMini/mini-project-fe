// import ConfirmModal from "../../components/ui/ConfirmModal";
import React, { useState } from 'react';
import Btn from './_Btn';
import { Link } from 'react-router-dom';
import { ax } from '@/libs/axiosClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import useToken from '@/libs/hooks/useToken';
import { useSelector } from 'react-redux';

const ema = 't4';
const payload = {
  email: ema,
  password: ema,
};
const Home = () => {
  // accessToken 값만 가져오는 방법

  const handleClick = () => {};
  return (
    <div className='flex flex-col justify-center h-screen'>
      <h1 className='mx-auto text-4xl font-black mb-32'>LoanTech</h1>
      <div className='flex flex-col items-center gap-4'>
        <Link to='/signin'>
          <div>
            <Btn text={'로그인'} />
          </div>
        </Link>
        <Link to='/signup'>
          <Btn text={'회원가입'} onClick={handleClick} />
        </Link>
      </div>
    </div>
  );
};

// function mapStateToProps(state) {
//   return { toDos: state };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     postLogin: (text: string) => dispatch(add(text)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
