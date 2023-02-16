import React from "react";
import { FaSearchDollar } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const index = ({ type }) => {
  const isScroll = type === "scroll";
  const navigate = useNavigate();
  return (
    <div
      className={`flex justify-around items-center text-4xl text-gray py-6 rounded-t-3xl border-t border-gray cursor-pointer bottom-0 ${
        isScroll
          ? `max-w-screen-sm sticky mx-[-2.5rem]`
          : `absolute w-full left-0`
      } `}>
      <FaSearchDollar
        className='hover:text-yellow'
        onClick={() => navigate("/main")}
      />
      <AiFillHome
        className='hover:text-yellow'
        onClick={() => navigate("/main")}
      />
      <BsFillPersonFill
        className='hover:text-yellow'
        onClick={() => navigate("/user")}
      />
    </div>
  );
};

export default index;
