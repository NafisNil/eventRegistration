import { Menu } from "lucide-react";
import React from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  eventName?: string;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about_us" },
  { label: "Guests", href: "/guests_list" },
  { label: "Schedule", href: "/schedule_list" },
  { label: "Announcements", href: "/announcements_list" },
  { label: "Contact", href: "/contact_us" },
];

export const Header: React.FC<HeaderProps> = ({ eventName = "National Innovation & Digital Governance Summit 2026" }) => {
  const brandInitial = eventName.trim().charAt(0)?.toUpperCase() || "N";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 text-slate-800 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-xl font-bold text-white shadow-lg shadow-emerald-200 transition-colors group-hover:bg-emerald-500">
            {brandInitial}
          </div>
          <span className="max-w-45 text-sm font-semibold tracking-tight leading-tight text-slate-800 sm:max-w-none">
            {eventName}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="h-10 w-10 rounded-lg border-slate-200 bg-white text-slate-700 shadow-sm"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-70 sm:w-80">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation menu</SheetTitle>
                </SheetHeader>

                <nav className="mt-8 flex flex-col items-center gap-2 text-center">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="w-full rounded-lg px-3 py-2 text-base font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link
            href="/user_register"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-500 sm:px-5"
          >
            Register Now
          </Link>
        </div>
      </div>
    </header>
  );
};