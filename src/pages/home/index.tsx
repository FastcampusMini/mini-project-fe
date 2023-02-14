// import ConfirmModal from "../../components/ui/ConfirmModal";
import React, { useState } from "react";
import Btn from "./Btn";
import ConfirmModal from "@components/ui/ConfirmModal";

const Home = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className='flex flex-col justify-center h-screen'>
      {modal && (
        <ConfirmModal
          title='정말 탈퇴하실건가요?'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aperiam magnam error provident iste,'
          onConfirm={() => setModal(false)}
          onCancel={() => setModal(false)}
        />
      )}
      <h1 className='mx-auto text-4xl font-black mb-32'>Finnq</h1>
      <div className='flex flex-col items-center gap-4'>
        <Btn text={"로그인"} onClick={() => setModal(true)} />
        <Btn text={"회원가입"} />
      </div>
    </div>
  );
};

export default Home;
