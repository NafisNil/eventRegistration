import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface About {
  id: number;
  description: string;
  reason_to_attend?: string | null;
  objectives?: string | null;
  eligibility?: string | null;
}

interface IndexProps {
  about?: About[];
}

export default function Index({ about = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete about entry?',
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

      router.delete(`/about/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'About deleted',
            text: 'The about entry was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="About" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
            <h1 className="mt-2 text-2xl font-bold">About Management</h1>
          </div>
          {about.length === 0 ? (
            <Link
              href="/about/create"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Add About
            </Link>
          ) : (
            <Link
              href={`/about/${about[0].id}/edit`}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Edit About
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {about.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No about entries found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Reason to attend</th>
                    <th className="px-4 py-3 font-semibold">Objectives</th>
                    <th className="px-4 py-3 font-semibold">Eligibility</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {about.map((about) => (
                    <tr key={about.id} className="align-top">
                      <td className="px-4 py-4">
                        <div
                          className="prose prose-emerald max-w-none text-sm text-slate-700"
                          dangerouslySetInnerHTML={{ __html: about.description }}
                        />
                      </td>

                      <td className="px-4 py-4">
                        {about.reason_to_attend ? (
                          <div
                            className="prose prose-emerald max-w-none text-sm text-slate-700"
                            dangerouslySetInnerHTML={{ __html: about.reason_to_attend }}
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {about.objectives ? (
                          <div
                            className="prose prose-emerald max-w-none text-sm text-slate-700"
                            dangerouslySetInnerHTML={{ __html: about.objectives }}
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {about.eligibility ? (
                          <div
                            className="prose prose-emerald max-w-none text-sm text-slate-700"
                            dangerouslySetInnerHTML={{ __html: about.eligibility }}
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/about/${about.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(about.id)}
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
  <AdminLayout currentRoute="about.index">{page}</AdminLayout>
);