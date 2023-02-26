import { DELETE_TOKEN, SET_TOKEN } from '@/features/authSlice/authSlice';
import { ax } from '@/libs/axiosClient';
import { getCookieToken, removeCookieToken } from '@/libs/Cookie';
import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function CheckToken(key: string) {
  const [isAuth, setIsAuth] = useState('Loaded');
  const { authenticated, expireTime } = useSelector((state: any) => state.authToken);
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();

  useEffect(() => {
    /** 1. 페이지 이동할 경우에 accessToken 새로 발급 */
    const checkAuthToken = async () => {
      if (!refreshToken) {
        // 쿠키에 refreshToken이 없다면, accessToken 제거
        dispatch(DELETE_TOKEN());
        setIsAuth('Failed');
      } else {
        const response = await ax.postRefresh(refreshToken);

        if (response.code === 200) {
          const accessToken = response.data.accessToken;
          dispatch(SET_TOKEN(accessToken));
          setIsAuth('Success');
          // cogoToast.info(response.message);
        } else {
          dispatch(DELETE_TOKEN());
          removeCookieToken();
          setIsAuth('Failed');
          // cogoToast.info(response.message);
        }
      }
    };

    checkAuthToken();
  }, [refreshToken, dispatch, key]);

  return { isAuth };
}

/** 2. accessToken 만료되면 재발급 받는 방식 */
// const checkAuthToken = async () => {
//   if (!refreshToken) {
//     // 쿠키에 refreshToken이 없다면, accessToken 제거
//     dispatch(DELETE_TOKEN());
//     setIsAuth('failed');
//   } else {
//     // 쿠키에 refreshToken이 존재할 경우
//     if (authenticated && new Date().getTime() < expireTime) {
//       // 로그인이 되어 있고, 만료기간이 남았있을 경우
//       setIsAuth('Success');
//     } else if (authenticated && expireTime - new Date().getTime() <= 60 && expireTime - new Date().getTime() > 0) {
//       // 로그인이 되어있고 만료기간 60초 이내일 경우, 새로 accessToken 발급
//       const response = await requestToken(refreshToken);

//       console.log('response1:', response);
//       if (response.code === 200) {
//         const accessToken = response.data.accessToken;
//         dispatch(SET_TOKEN(accessToken));
//         setIsAuth('Success');
//       } else {
//         dispatch(DELETE_TOKEN());
//         removeCookieToken();
//         setIsAuth('Failed');
//       }
//     } else {
//       // 로그인이 되어 있지 않을때(accessToken이 만료되었을때) accessToken 발급
//       const response = await requestToken(refreshToken);

//       if (response.code === 200) {
//         const accessToken = response.data.accessToken;
//         dispatch(SET_TOKEN(accessToken));
//         setIsAuth('Success');
//         alert(response.message);
//       } else {
//         console.log('response3:', response);
//         dispatch(DELETE_TOKEN());
//         removeCookieToken();
//         setIsAuth('Failed');
//         alert(response.message);
//       }
//     }

//   }
// };
