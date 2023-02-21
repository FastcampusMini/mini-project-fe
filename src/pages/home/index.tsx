// import ConfirmModal from "../../components/ui/ConfirmModal";
import React, { useState } from 'react';
import Btn from './_Btn';
import { Link } from 'react-router-dom';
import { ax } from '@/libs/axiosClient';

const ema = 't4';
const payload = {
  email: ema,
  password: ema,
};
const Home = () => {
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGYXN0Q2FtcHVzIiwiaWF0IjoxNjc2OTUwNDI1LCJleHAiOjE2NzY5NTIyMjUsImVtYWlsIjoidDQifQ.ShmBlHPXQR-TNnj_F63PDwEoEfMfPzH1y_ptRWPfP0I';
  const handleClick = () => {
    ax.deleteUser(accessToken, payload);
  };
  return (
    <div className='flex flex-col justify-center h-screen'>
      <h1 className='mx-auto text-4xl font-black mb-32'>Finnq</h1>
      <div className='flex flex-col items-center gap-4'>
        <Link to='/signin'>
          <div>
            <Btn text={'로그인'} />
          </div>
        </Link>
        {/* <Link to='/signup'> */}
        <Btn text={'회원가입'} onClick={handleClick} />
        {/* </Link> */}
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
