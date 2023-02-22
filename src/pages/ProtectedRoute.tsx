import CheckToken from '@/components/CheckToken';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isAuth } = CheckToken(location.key);
  // if (isAuth === 'Failed') {
  //   return <Navigate to='/signin' replace />;
  // }

  return children;
  // 로그인한 사용자가 있는지 확인
  // requireAdmin이 true인 경우에는 로그인도 되어 있어야 하고, 어드민 권한도 가지고 있어야 함
  // 조건에 맞지 않으면 / 상위 경로로 이동!
  // 조건에 맞는 경우에만 전달된 children을 보여줌
};

export const SuccessRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);
  // if (isAuth === 'Success') {
  //   return <Navigate to='/main' replace />;
  // }
  return children;
};
