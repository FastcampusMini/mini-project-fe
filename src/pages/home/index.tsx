import React from "react";
import Btn from "./Btn";

const Home = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="mx-auto text-4xl font-black mb-32">Finnq</h1>
      <div className="flex flex-col items-center gap-4">
        <Btn text={"로그인"} />
        <Btn text={"회원가입"} />
      </div>
    </div>
  );
};

export default Home;
