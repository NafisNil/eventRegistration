import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface Location {
  id: number;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  map?: string | null;
}

interface IndexProps {
  locations?: Location[];
}

const previewText = (value?: string | null) => {
  if (!value) {
    return '—';
  }

  const plainText = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  if (plainText.length <= 100) {
    return plainText;
  }

  return `${plainText.slice(0, 100)}...`;
};

const renderAddress = (value?: string | null) => {
  if (!value) {
    return '—';
  }

  return <div className="prose prose-sm max-w-none prose-emerald [&_*]:text-slate-700" dangerouslySetInnerHTML={{ __html: value }} />;
};

export default function Index({ locations = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete location?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      router.delete(`/locations/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Location deleted',
            text: 'The location was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="Locations" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Event Details</p>
            <h1 className="mt-2 text-2xl font-bold">Locations</h1>
          </div>

            {locations.length > 0 && (
              <Link
                href={`/locations/${locations[0].id}/edit`}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Edit Location
              </Link>
            )}
            {locations.length === 0 && (
              <Link
                href="/locations/create"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Create Location
              </Link>
            )}

        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {locations.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No locations found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Address</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Map</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {locations.map((location) => (
                    <tr key={location.id} className="align-top">
                      <td className="px-4 py-4 text-slate-700">{renderAddress(location.address)}</td>
                      <td className="px-4 py-4 text-slate-700">{location.phone ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{location.email ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-700">
                        {location.map ? (
                          <iframe
                            src={location.map}
                            title={`Map for ${location.email ?? 'location'}`}
                            className="h-32 w-full rounded-lg border border-emerald-200"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/locations/${location.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(location.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
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
  <AdminLayout currentRoute="locations.index">{page}</AdminLayout>
);