import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface Guest {
  id: number;
  name: string;
  designation: string;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
}

interface IndexProps {
  guests?: Guest[];
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

const expertiseBadges = (value?: string | null) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function Index({ guests = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete guest entry?',
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

      router.delete(`/guests/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Guest deleted',
            text: 'The guest entry was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="Guests" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
            <h1 className="mt-2 text-2xl font-bold">Guest Management</h1>
          </div>

            <Link
              href="/guests/create"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Add Guest
            </Link>

        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {guests.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No guest entries found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Designation</th>
                    <th className="px-4 py-3 font-semibold">Logo</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Expertise</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {guests.map((guest) => (
                    <tr key={guest.id} className="align-top">
                      <td className="px-4 py-4 font-medium text-slate-800">{guest.name}</td>

                      <td className="px-4 py-4 text-slate-700">{guest.designation}</td>

                      <td className="px-4 py-4">
                        {guest.logo ? (
                          <img
                            src={`/storage/${guest.logo}`}
                            alt={guest.name}
                            className="h-14 w-14 rounded-lg object-cover border border-emerald-200 bg-emerald-50"
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {previewText(guest.description)}
                      </td>

                      <td className="px-4 py-4">
                        {guest.expertise ? (
                          <div className="flex flex-wrap gap-2">
                            {expertiseBadges(guest.expertise).map((item, index) => (
                              <span
                                key={`${guest.id}-${item}-${index}`}
                                className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/guests/${guest.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(guest.id)}
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
  <AdminLayout currentRoute="guests.index">{page}</AdminLayout>
);