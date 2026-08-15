import React from 'react';

interface StatProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
}

export const StatCard: React.FC<StatProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="p-5 bg-white rounded-2xl border border-emerald-100/80 shadow-xs flex items-center space-x-4">
      <div className="p-3 bg-emerald-50 rounded-xl text-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 mt-0.5">{value}</h3>
        <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
};