import React, { useEffect, useState } from "react";
import LoanProduct from "@components/LoanProductCard";
import { TotalLoans } from "./TotalLoans";
import FNB from "@components/FNB/index";
import Nav from "@components/Nav";
import { token, ax } from "@/libs/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Data } from "../../store/api/cartApi";
import { paginaton } from "@/libs/utils";
import SkeletonLoanProductCard from "@/components/SkeletonLoanProductCard";
import { useLocation, useParams } from "react-router-dom";
import Confirmed from "./_Confirmed";
import useGetProducts from "../../libs/hooks/useGetProducts";

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
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const { data, isLoading, refetch } = useGetProducts(token.accessToken);

  const handleTotal = () => {
    console.log("clicked");
    setSize((prev) => prev + 1);
  };
  return (
    <>
      <Confirmed />
      <main className='flex flex-col'>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 space-y-8'>
          <TotalLoans amount={3200} onClick={handleTotal} />

          {isLoading ? (
            <SkeletonLoanProductCard />
          ) : (
            paginaton(data, size, page)?.map((product) => (
              <LoanProduct key={product.productId} product={product} />
            ))
          )}
          {/* <LoanProduct product={data[0]} /> */}
        </div>
      </main>
    </>
  );
};

export default Main;
