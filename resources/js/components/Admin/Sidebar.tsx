import { Link } from '@inertiajs/react';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentRoute?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentRoute = 'dashboard' }) => {
  const menuItems = [
    { label: 'Overview', route: 'dashboard', icon: '📊', href: '/dashboard' },
    { label: 'Hero Section', route: 'heroes.index', icon: '🦸', href: '/heroes' },
    { label: 'Keynote Speakers', route: 'speakers', icon: '🎤', href: '#' },
    { label: 'Registrations', route: 'registrations', icon: '🎟️', href: '#' },
    { label: 'Topics & Objectives', route: 'topics', icon: '🌿', href: '#' },
    { label: 'Sponsors & Partners', route: 'sponsors', icon: '🤝', href: '#' },
    { label: 'Media & Branding', route: 'media', icon: '📣', href: '#' },
    { label: 'Settings', route: 'settings', icon: '⚙️', href: '#' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-emerald-950 text-emerald-100 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Title */}
        <div className="h-16 flex items-center px-6 border-b border-emerald-900 bg-emerald-950/80">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-emerald-600 rounded-lg text-white font-bold text-lg">🌱</span>
            <div>
              <h1 className="font-bold text-sm text-white leading-tight">Eco-Building '26</h1>
              <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentRoute === item.route;

            return (
              <Link
                key={item.route}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-emerald-300 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Organizer Branding Badge */}
        <div className="p-4 m-4 bg-emerald-900/40 rounded-xl border border-emerald-800/60 text-xs">
          <p className="font-semibold text-emerald-300 uppercase tracking-wider text-[10px]">Organized By</p>
          <p className="font-bold text-white mt-0.5">ADPOINT & REHAB</p>
          <p className="text-emerald-400 text-[11px]">BCFCC, Dhaka</p>
        </div>
      </aside>
    </>
  );
};