import { useState } from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import store from './store/store';
import Nav from './components/Nav';
import DevLinks from './DevLinks';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      {/* <DevLinks /> */}
      <main className='max-w-lg h-screen overflow-y-hidden border-black20 shadow-lg mx-auto relative'>
        <Outlet />
      </main>
    </CookiesProvider>
  );
}

export default App;
