import { cartApi } from './api/cartApiSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});

export default store;
