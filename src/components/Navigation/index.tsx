import React from "react";
import { FaSearchDollar } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center w-full text-4xl text-gray justify-around absolute bottom-0 right-0 py-6 rounded-t-3xl border-t border-gray">
      <FaSearchDollar
        className="hover:text-yellow"
        onClick={() => navigate("/home")}
      />
      <AiFillHome
        className="hover:text-yellow"
        onClick={() => navigate("/main")}
      />
      <BsFillPersonFill
        className="hover:text-yellow"
        onClick={() => navigate("/user")}
      />
    </div>
  );
};

export default index;
