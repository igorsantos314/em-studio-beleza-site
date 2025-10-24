import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="text-lg font-semibold text-gray-800">
        Studio Beleza
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">Home</a>
        <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">Serviços</a>
        <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">Galeria</a>
        <a href="#" className="text-gray-600 hover:text-rose-600 transition-colors">Contato</a>
      </nav>
    </header>
  );
};
