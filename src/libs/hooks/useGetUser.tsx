import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ax } from "../axiosClient";
import useToken from "./useToken";

const useGetUser = (options?) => {
  const { accessToken, refreshToken } = useToken();
  console.log("가져왔나", accessToken);
  const result = useQuery(["user"], () => ax.getUser(accessToken), {
    ...options,
  });

  return result;
};

export default useGetUser;
