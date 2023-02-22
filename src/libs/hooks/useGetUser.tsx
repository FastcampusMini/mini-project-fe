import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ax } from '../axiosClient';
import useToken from './useToken';

/** const { data, isLoading , refetch } = useGetUser(accessToken)
 * 로딩이 끝나면(isLoading : false) data 에 유저 정보가 담깁니다.
 * refetch() 로 다시 요청할수 있습니다.
 *  */
const useGetUser = (accessToken, options?) => {
  if (!accessToken) {
    console.log('accessToken이 없습니다');
    return;
  }

  return useQuery<IUserInfo>(
    ['user', accessToken],
    () => ax.getUser(accessToken),
    {
      ...options,
    }
  );
};

export default useGetUser;
