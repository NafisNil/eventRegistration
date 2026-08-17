import { Head, Link } from '@inertiajs/react';
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';

interface Guest {
  id: number;
  name: string;
  designation: string;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
}

interface ShowProps {
  guest: Guest;
}

const expertiseBadges = (value?: string | null) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function Show({ guest }: ShowProps) {
  const badges = expertiseBadges(guest.expertise);

  return (
    <>
      <Head title={`${guest.name} | Guest Details`} />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
              <h1 className="mt-2 text-2xl font-bold">{guest.name}</h1>
              <p className="mt-1 text-sm text-emerald-100">{guest.designation}</p>
            </div>

            <Link href="/guests" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
            {guest.logo ? (
              <img
                src={`/storage/${guest.logo}`}
                alt={guest.name}
                className="h-72 w-full rounded-xl object-cover border border-emerald-200 bg-emerald-50"
              />
            ) : (
              <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50 text-sm text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Description</h2>
              {guest.description ? (
                <div
                  className="prose prose-emerald mt-3 max-w-none text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: guest.description }}
                />
              ) : (
                <p className="mt-3 text-sm text-slate-500">No description added yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">Expertise</h2>

              {badges.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {badges.map((item, index) => (
                    <span
                      key={`${guest.id}-${item}-${index}`}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No expertise listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Show.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="guests.index">{page}</AdminLayout>
);