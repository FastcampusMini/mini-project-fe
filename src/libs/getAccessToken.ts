import { useSelector } from 'react-redux';

export const getAccessToken = () => {
  const { accesstoken } = useSelector((state: any) => state.authToken);
  return accesstoken;
};
