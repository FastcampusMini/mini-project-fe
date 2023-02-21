import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';

const useLogin = (options?) => {
  const queryClient = useQueryClient();

  const output = useMutation(
    ['login'],
    (loginInfo: ILoginInput) => ax.postLogin(loginInfo),
    Object.assign(
      {
        cacheTime: 1000,
        onSuccess: (data) => {
          queryClient.setQueryData(['token'], () => data);
        },
      },
      options
    )
  );

  return output;
};

export default useLogin;
