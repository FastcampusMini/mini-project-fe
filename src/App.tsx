import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Navigation from './components/Navigation';

function App() {
  return (
    <main className='max-w-screen-sm min-h-screen p-10 border-gray shadow-md mx-auto relative'>
      <Outlet />
      <Navigation />
    </main>
  );
}

export default App;
