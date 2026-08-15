import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { StatCards } from '../../Components/Admin/StatCards';
import { StatCard } from '@/components/Admin/StatCard';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Registrations',
      value: '1,234',
      subtitle: '+12% from last week',
      icon: '📋',
    },
    {
      title: 'Pending Approvals',
      value: '48',
      subtitle: '8 awaiting verification',
      icon: '⏳',
    },
    {
      title: 'Verified Attendees',
      value: '987',
      subtitle: '80% confirmation rate',
      icon: '✓',
    },
    {
      title: 'Event Sessions',
      value: '24',
      subtitle: '6 keynote presentations',
      icon: '🎤',
    },
  ];

  return (
    <>
      <Head title="Event Schedule - Admin" />

      {/* Page Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl shadow-xs">
        <h2 className="text-2xl font-bold">Dashboard </h2>
        <p className="text-emerald-200 text-sm mt-1">
          Manage session timings, keynote presentations, and speaker slots
        </p>
      </div>

      {/* Page Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        ))}
      </div>
    </>
  );
}

// Attach Persistent Layout
Dashboard.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="dashboard">{page}</AdminLayout>
);