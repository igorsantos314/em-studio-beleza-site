import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>© {currentYear} Studio Beleza</span>
        <span className="text-gray-400">•</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span>Feito por</span>
        <span>Igor Santos</span>
      </div>
    </footer>
  );
};