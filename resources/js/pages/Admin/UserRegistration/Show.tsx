import { Head, Link } from '@inertiajs/react';
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  gender?: string | null;
  organization?: string | null;
  designation?: string | null;
  district?: string | null;
  address?: string | null;
  other_info?: string | null;
  logo?: string | null;
  unique_code?: string | null;
  created_at?: string | null;
}

interface ShowProps {
  registration: Registration;
}

export default function Show({ registration }: ShowProps) {
  return (
    <>
      <Head title={`${registration.name} | Registration Details`} />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Registration</p>
              <h1 className="mt-2 text-2xl font-bold">{registration.name}</h1>
              <p className="mt-1 text-sm text-emerald-100">{registration.email}</p>
            </div>

            <Link href="/user-registrations" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            {registration.logo ? (
              <img
                src={`/storage/${registration.logo}`}
                alt={registration.name}
                className="h-72 w-full rounded-xl border border-emerald-200 bg-emerald-50 object-cover"
              />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50 text-sm text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <InfoBlock label="Phone" value={registration.phone} />
              <InfoBlock label="Gender" value={registration.gender} />
              <InfoBlock label="Institution" value={registration.organization} />
              <InfoBlock label="Designation" value={registration.designation} />
              <InfoBlock label="District" value={registration.district} />
              <InfoBlock label="Unique Code" value={registration.unique_code} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">Address</h2>
              {registration.address ? (
                <div
                  className="prose prose-emerald mt-3 max-w-none text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: registration.address }}
                />
              ) : (
                <p className="mt-3 text-sm text-slate-500">No address provided.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">Other Information</h2>
              {registration.other_info ? (
                <div
                  className="prose prose-emerald mt-3 max-w-none text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: registration.other_info }}
                />
              ) : (
                <p className="mt-3 text-sm text-slate-500">No additional information provided.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">Submitted At</h2>
              <p className="mt-3 text-sm text-slate-700">
                {registration.created_at ? new Date(registration.created_at).toLocaleString('en-GB') : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">{label}</p>
      <p className="mt-2 text-sm text-slate-800">{value || '—'}</p>
    </div>
  );
}

Show.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="user-registrations.index">{page}</AdminLayout>
);