import React from "react";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <div>User</div>
      <Outlet />
    </>
  );
};

export default User;
