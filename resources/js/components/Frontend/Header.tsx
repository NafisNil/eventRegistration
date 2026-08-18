import React from "react";
import { Link } from "@inertiajs/react";

interface HeaderProps {
  eventName?: string;
}

export const Header: React.FC<HeaderProps> = ({ eventName = "National Innovation & Digital Governance Summit 2026" }) => {
  const brandInitial = eventName.trim().charAt(0)?.toUpperCase() || "N";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 text-slate-800 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-xl font-bold text-white shadow-lg shadow-emerald-200 transition-colors group-hover:bg-emerald-500">
            {brandInitial}
          </div>
          <span className="max-w-[180px] text-sm font-semibold tracking-tight leading-tight text-slate-800 sm:max-w-none">
            {eventName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          <Link href="/" className="text-slate-800 hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="/about_us" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link href="/guests_list" className="hover:text-emerald-600 transition-colors">Guests</Link>
          <Link href="/schedule_list" className="hover:text-emerald-600 transition-colors">Schedule</Link>
          <Link href="/announcements_list" className="hover:text-emerald-600 transition-colors">Announcements</Link>
          <Link href="/contact_us" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/user_register"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-500"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
};