import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="bg-white flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
