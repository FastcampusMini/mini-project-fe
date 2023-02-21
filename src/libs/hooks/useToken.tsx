import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

interface IToken {
  accessToken: string;
  refreshToken: string;
}

type TUseLogin = () => IToken;
const useToken: TUseLogin = () => {
  const queryClient = useQueryClient();
  if (queryClient.getQueryData(['token']))
    return queryClient.getQueryData(['token']);
  console.log('캐싱된 token 이 없습니다.');
  return { accessToken: '', refreshToken: '' };
};

export default useToken;
