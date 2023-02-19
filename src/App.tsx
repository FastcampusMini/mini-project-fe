import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import DevLinks from './DevLinks';

function App() {
  return (
    <CookiesProvider>
      {/* <DevLinks /> */}
      <main className='max-w-screen-sm h-screen overflow-y-scroll px-10 pt-10 border-gray shadow-md mx-auto relative'>
        <Outlet />
      </main>
    </CookiesProvider>
  );
}

export default App;
