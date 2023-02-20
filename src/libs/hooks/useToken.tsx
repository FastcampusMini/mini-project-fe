import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface IToken {
  accessToken: string;
  refreshToken: string;
}

const useToken = (): IToken => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(["token"]);
};

export default useToken;
