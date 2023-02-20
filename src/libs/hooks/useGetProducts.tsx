import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ax, token } from "../axiosClient";

const useGetProducts = (accessToken) => {
  const queryPack = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: () => ax.getProducts(accessToken),
    onSuccess: (data) => {
      // console.log("onSuccess", data);
    },
    onError: () => {
      console.log("react-query 에러감지! 로그인해야합니다");
    },
    staleTime: Infinity,
  });
  return queryPack;
};

export default useGetProducts;
