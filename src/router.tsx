import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/home';
import Main from './pages/main';
import Financial from './pages/products/financial';
import FinancialId from './pages/products/financial/[financialId]';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import User from './pages/user';
import Edit from './pages/user/Edit';
import MyCart from './pages/user/MyCart';
import WishList from './pages/user/WishList';
import OrderList from './pages/user/OrderList';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { SuccessRoute } from './pages/ProtectedRoute';
import NotFound from './pages/NotFound';

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
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
      },

      {
        path: 'signin',
        element: (
          <SuccessRoute>
            <SignIn />
          </SuccessRoute>
        ),
      },
      {
        path: 'signup',
        element: (
          <SuccessRoute>
            <SignUp />
          </SuccessRoute>
        ),
      },
      {
        path: 'user/mycart',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/edit',
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/wishlist',
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/orderlist',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products/financial/:financialId',
        element: (
          <ProtectedRoute>
            <FinancialId />
          </ProtectedRoute>
        ),
      },

      {
        path: 'products/financial',
        element: (
          <ProtectedRoute>
            <Financial />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
