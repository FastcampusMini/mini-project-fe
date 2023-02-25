import CheckToken from '@/components/CheckToken';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SuccessRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);
  if (isAuth === 'Success') {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default SuccessRoute;
