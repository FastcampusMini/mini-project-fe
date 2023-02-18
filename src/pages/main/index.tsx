import React from "react";
import LoanProduct from "@components/LoanProductCard";
import { TotalLoans } from "./TotalLoans";
import FNB from "@components/FNB/index";
import Nav from "@components/Nav";

const Main = () => {
  return (
    <>
      <main className='flex flex-col'>
        <Nav left='arrow' right='arrow' />
        <div className='px-3 space-y-8'>
          <TotalLoans amount={3200} />
          <LoanProduct />
          <LoanProduct />
          <LoanProduct />
        </div>
      </main>
    </>
  );
};

export default Main;
