import React from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-emerald-100/80 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left Action */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:bg-emerald-50 rounded-lg lg:hidden"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full hidden sm:inline-block">
          📍 Harmony Hall, BCFCC • 5 Sept 2026
        </span>
      </div>

      {/* Right Actions / User Profile */}
      <div className="flex items-center space-x-4">
        <button className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg relative">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center">
            A
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">Admin Console</p>
            <p className="text-xs text-gray-500">adpointbd@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};