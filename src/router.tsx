import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Main from "./pages/main";
import Financial from "./pages/products/financial";
import FinancialId from "./pages/products/financial/[financialId]";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import User from "./pages/user";
import Edit from "./pages/user/Edit";
import MyCart from "./pages/user/MyCart";
import WishList from "./pages/user/WishList";
import OrderList from "./pages/user/OrderList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "main",
        element: <Main />,
      },

      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "user/mycart",
        element: <MyCart />,
      },
      {
        path: "user/edit",
        element: <Edit />,
      },
      {
        path: "user/wishlist",
        element: <WishList />,
      },
      {
        path: "user/orderlist",
        element: <OrderList />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "products/financial/:financialId",
        element: <FinancialId />,
      },

      {
        path: "products/financial",
        element: <Financial />,
      },
    ],
  },
]);

export default router;
