import React from 'react';
import { Bookmark, LogIn } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-neo-accent neo-border p-2 group-hover:-rotate-6 transition-transform">
          <Bookmark className="w-6 h-6" />
        </div>
        <span className="text-2xl font-extrabold tracking-tighter uppercase">
          Curated Vibe
        </span>
      </div>
      
      <button className="neo-border px-4 py-2 font-bold hover:bg-black hover:text-white transition-colors flex items-center gap-2">
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Accedi con Google</span>
      </button>
    </nav>
  );
};
