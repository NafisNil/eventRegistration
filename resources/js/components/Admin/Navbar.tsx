import { router, usePage } from '@inertiajs/react';
import React from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { auth } = usePage().props as {
    auth?: {
      user?: {
        name?: string;
        email?: string;
      };
    };
  };

  const user = auth?.user;
  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'A'
    : 'A';

  const handleLogout = () => {
    router.post('/logout');
  };

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
        <button className="p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg relative" aria-label="Notifications">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center">
            {initials}
          </div>

          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name ?? 'Admin Console'}</p>
            <p className="text-xs text-gray-500">{user?.email ?? 'admin@example.com'}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 sm:inline-flex"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};