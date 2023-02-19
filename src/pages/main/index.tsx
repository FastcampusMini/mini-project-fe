import React, { useEffect, useState } from "react";
import LoanProduct from "@components/LoanProductCard";
import { TotalLoans } from "./TotalLoans";
import FNB from "@components/FNB/index";
import Nav from "@components/Nav";
import { accessToken, ax } from "@/libs/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Data } from "../../store/api/cartApi";
import { paginaton } from "@/libs/utils";

interface IProduct {
  brand: string;
  detail: string;
  logo: string;
  name: string;
  price: number;
  productId: number;
  rate: number;
}
interface IGetProductsReturn {
  code: number;
  data: IProduct[];
  message: string;
}
const Main = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);

  const { data, isLoading, refetch } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: () => ax.getProducts(accessToken),
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
    staleTime: Infinity,
  });

  return (
    <>
      <main className='flex flex-col'>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 space-y-8'>
          <TotalLoans amount={3200} />
          {paginaton(data, size, page).map((product) => (
            <LoanProduct key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
