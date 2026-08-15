import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-emerald-100 py-4 px-6 lg:px-8 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
        <p>© 2026 Workshop on Eco-Friendly Green Building Construction.</p>
        <p className="text-gray-400">Organized by ADPOINT in Association with REHAB[cite: 1]</p>
      </div>
    </footer>
  );
};