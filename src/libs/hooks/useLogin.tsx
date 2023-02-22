import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';
/** 로그인을 요청할 수 있습니다.
 * const { mutate, isLoading } = useLogin();
 * mutate({email: "testt", password: "testt"}); 로그인요청
 * 성공하면 onSuccess 의 함수가 실행됩니다. (일단은 react-query 에 토큰을 캐싱하도록 해놓음)
 */
const useLogin = (options?) => {
  const queryClient = useQueryClient();

  const output = useMutation(
    ['login'],
    (loginInfo: ILoginInput) => ax.postLogin(loginInfo),
    Object.assign(
      {
        cacheTime: 1000 * 30,
        onSuccess: (data) => {
          // 토큰정보도 추가로 캐싱하기 (임시)
          queryClient.setQueryData(['token'], () => data);
        },
      },
      options
    )
  );

  return output;
};

export default useLogin;
