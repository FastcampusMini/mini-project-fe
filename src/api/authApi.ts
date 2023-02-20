import { useCookies } from 'react-cookie';
import { instance } from './axios';

/** 회원가입 api */
export const signUp = async ({ name, email, pw, phone, birth, job, salary }) => {
  try {
    const response = await instance.post('/register', JSON.stringify({ name, email, pw, phone, birth, job, salary }));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/** 로그인 api */
export const logIn = async ({ email, password }) => {
  try {
    const response = await instance.post('/login', { email, password });
    return response;
  } catch (error) {
    if (error.response.status === 400) {
      alert(error.response.data);
    } else {
      console.log(error);
    }
  }
};

// 타임아웃 지정해줘야함!!

/** 로그아웃 api */
export const logOut = async ({ refreshtoken }) => {
  try {
    const response = await instance.post(
      '/logout',
      { token: refreshtoken },
      {
        headers: { Authorization: `Bearer ${refreshtoken}` },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

/** 회원탈퇴 api */
export const deleteAuth = async ({ password }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie_name']);
  try {
    const response = await instance.delete('/user', {
      headers: { Authorization: `Bearer ${cookies.cookie_name.accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};
