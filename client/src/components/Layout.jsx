import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto min-h-screen max-w-screen-xl">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
