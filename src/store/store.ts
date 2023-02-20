import { cartApi } from "./api/cartApiSlice";
import { orderApi } from "./api/orderApiSlice";
import { wishlistApi } from "./api/wishlistApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";

const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    authToken: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cartApi.middleware,
      orderApi.middleware,
      wishlistApi.middleware,
    ]),
});

export default store;
