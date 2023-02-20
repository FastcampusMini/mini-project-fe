// import ConfirmModal from "../../components/ui/ConfirmModal";
import React, { useState } from "react";
import Btn from "./_Btn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ax } from "@/libs/axiosClient";
import { useMutation } from "@tanstack/react-query";

interface ILoginInfo {
  email: string;
  password: string;
}

const Home = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginInfo: ILoginInfo) => ax.postLogin(loginInfo),
    onSuccess: () => {
      console.log("로그인 성공(useMutation)");
    },
    onError: () => {
      console.log("로그인 에러!");
    },
  });

  const handleClick = () => {
    console.log("로그인 클릭!");
    ax.postLogin({
      email: "testt",
      password: "testt",
    });
  };
  return (
    <div className='flex flex-col justify-center h-screen'>
      <h1 className='mx-auto text-4xl font-black mb-32'>Finnq</h1>
      <div className='flex flex-col items-center gap-4'>
        {/* <Link to='/signin'> */}
        <div onClick={handleClick}>
          <Btn text={"로그인"} />
        </div>
        {/* </Link> */}
        <Link to='/signup'>
          <Btn text={"회원가입"} />
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
