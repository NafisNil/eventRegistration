import React, { useState, PropsWithChildren } from 'react';
import { Sidebar } from '../components/Admin/Sidebar';
import { Navbar } from '../components/Admin/Navbar';
import { Footer } from '../components/Admin/Footer';

interface AdminLayoutProps {
  currentRoute?: string;
}

export const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = ({
  children,
  currentRoute = 'dashboard',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-emerald-50/30 flex">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} currentRoute={currentRoute} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Page Content injected here */}
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;