import { cartApi } from "./api/cartApi";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const login = createSlice({
  name: "loginReducer",
  initialState: {},
  reducers: {
    loginReducer: (loginInput, action) => {
      const _loginInput = { ...loginInput };
      return _loginInput;
    },
  },
});

const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
});

export default store;
