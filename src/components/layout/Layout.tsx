import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import ChatAssistant from '../chatbot/ChatAssistant';

export const Layout: React.FC = () => {
  return (
    <div className="bg-white flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};
