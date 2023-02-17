import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import DevLinks from "./DevLinks";

function App() {
  return (
    <>
      <DevLinks />
      <main className='max-w-screen-sm h-screen overflow-y-scroll px-10 pt-10 border-gray shadow-md mx-auto relative'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
