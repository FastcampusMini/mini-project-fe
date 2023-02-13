import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Main from './pages/Main';
import Financial from './pages/products/Financial';
import FinancialId from './pages/products/Financial/[financialId]';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Edit from './pages/User/Edit';
import MyCart from './pages/User/MyCart';
import WishList from './pages/User/WishList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'main',
        element: <Main />,
      },

      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'user/mycart',
        element: <MyCart />,
      },
      {
        path: 'user/edit',
        element: <Edit />,
      },
      {
        path: 'user/wishlist',
        element: <WishList />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'products/financial/:financialId',
        element: <FinancialId />,
      },

      {
        path: 'products/financial',
        element: <Financial />,
      },
    ],
  },
]);

export default router;
