import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <main className='max-w-screen-sm border mx-auto'>
      <Outlet />
    </main>
  );
}

export default App;
