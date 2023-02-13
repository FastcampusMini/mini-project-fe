import React from "react";
import { useParams } from "react-router-dom";

const Id = () => {
  const { financialId } = useParams();

  return <div>{financialId}</div>;
};

export default Id;
