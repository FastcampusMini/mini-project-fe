import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import router from './router';
import { Provider } from 'react-redux';
import store from './store/store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { cartApi } from './store/api/cartApiSlice';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiProvider api={cartApi}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ApiProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
