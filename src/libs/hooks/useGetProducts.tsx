import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetProducts = () => {
  useQuery({ queryKey: ["products"] });
  return <div>useGetProducts</div>;
};

export default useGetProducts;
