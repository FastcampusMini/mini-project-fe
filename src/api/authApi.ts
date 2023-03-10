import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { instance } from './axios';

/** 회원가입 api */
export const signUp = async ({
  name,
  email,
  password,
  phone,
  birth,
  job,
  salary,
}) => {
  try {
    const response = await instance.post(
      '/register',
      JSON.stringify({ name, email, password, phone, birth, job, salary }),
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 로그인 api */
export const logIn = async ({ email, password }) => {
  try {
    const response = await instance.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 로그아웃 api */
export const logOut = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await instance.post(
      '/logout',
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 유저 정보 api */
export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await instance.get('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 회원탈퇴 api */
export const deleteAuth = async (accessToken: string, password: string) => {
  try {
    const response = await instance.delete('/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { password },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 토큰 재발급 api*/
export const requestToken = async (refreshToken: string) => {
  try {
    const response = await instance.post('/refresh', { refreshToken });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
