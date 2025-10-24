import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>© {currentYear} Studio Beleza</span>
        <span className="text-gray-400">•</span>
        <a 
          href="/terms" 
          className="hover:text-rose-600 transition-colors"
        >
          Termos
        </a>
        <span className="text-gray-400">•</span>
        <a 
          href="/privacy" 
          className="hover:text-rose-600 transition-colors"
        >
          Privacidade
        </a>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <span>Feito com</span>
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        <span>para você</span>
      </div>
    </footer>
  );
};