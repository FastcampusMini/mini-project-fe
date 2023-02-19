// import ConfirmModal from "../../components/ui/ConfirmModal";
import React, { useState } from "react";
import Btn from "./_Btn";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='flex flex-col justify-center h-screen'>
      <h1 className='mx-auto text-4xl font-black mb-32'>Finnq</h1>
      <div className='flex flex-col items-center gap-4'>
        <Link to='/signin'>
          <Btn text={"로그인"} />
        </Link>
        <Link to='/signup'>
          <Btn text={"회원가입"} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
