import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <>
      <AiOutlineArrowLeft
        size="36"
        className=" cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      />
    </>
  );
};

export default Back;
