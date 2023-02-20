import { Cookies } from 'react-cookie';

const cookies = new Cookies();

/** refresh Token을 Cookie에 저장하기 위한 함수 */
export const setRefreshToken = (refreshToken: string) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 1);

  return cookies.set('refresh_token', refreshToken, {
    sameSite: true,
    path: '/',
    secure: true,
    expires: new Date(expireDate),
  });
};

/** Cookie에 저장된 refresh Token값을 가지고 오기 위한 함수 */
export const getCookieToken = () => {
  return cookies.get('refresh_token');
};

/** Cookie 삭제를 위한 함수(로그아웃 시 사용) */
export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
