import { Head, Link } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  unique_code?: string | null;
  logo?: string | null;
  
}

interface IndexProps {
  registrations?: Registration[];
}

export default function Index({ registrations = [] }: IndexProps) {
  const [search, setSearch] = useState('');

  const filteredRegistrations = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return registrations;
    }

    return registrations.filter((registration) => {
      const name = registration.name?.toLowerCase() ?? '';
      const uniqueCode = registration.unique_code?.toLowerCase() ?? '';

      return name.includes(keyword) || uniqueCode.includes(keyword);
    });
  }, [registrations, search]);

  return (
    <>
      <Head title="User Registrations" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Registration</p>
              <h1 className="mt-2 text-2xl font-bold">User Registrations</h1>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            <span className="mb-2 block">Search by name or unique code</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Type name or code..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
            />
          </label>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {filteredRegistrations.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              {search ? 'No matching registrations found.' : 'No registrations found yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Institution</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Unique Code</th>
                    <th className="px-4 py-3 font-semibold">Image</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration.id} className="align-middle">
                      <td className="px-4 py-4 font-medium text-slate-800">
                        <Link href={`/user-registrations/${registration.id}`} className="text-emerald-700 hover:underline">
                          {registration.name}
                        </Link>
                      </td>

                      <td className="px-4 py-4 text-slate-700">{registration.email}</td>

                      <td className="px-4 py-4 text-slate-700">
                        {registration.organization || '—'}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {registration.phone || '—'}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {registration.unique_code || '—'}
                      </td>

                      <td className="px-4 py-4">
                        {registration.logo ? (
                          <img
                            src={`/storage/${registration.logo}`}
                            alt={registration.name}
                            className="h-14 w-14 rounded-lg border border-emerald-200 bg-emerald-50 object-cover"
                          />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Index.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="user-registrations.index">{page}</AdminLayout>
);