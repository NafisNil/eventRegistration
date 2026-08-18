import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface ProgramHighlight {
  id: number;
  title: string;
  description?: string | null;
  logo?: string | null;
}

interface IndexProps {
  programHighlights?: ProgramHighlight[];
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

export default function Index({ programHighlights = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete entry?',
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

      router.delete(`/program-highlights/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Item deleted',
            text: 'The program highlight was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="Program Highlights" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
            <h1 className="mt-2 text-2xl font-bold">Program Highlights</h1>
          </div>

          <Link
            href="/program-highlights/create"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Add Program Highlight
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {programHighlights.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No program highlights found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Logo</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {programHighlights.map((programHighlight) => (
                    <tr key={programHighlight.id} className="align-top">
                      <td className="px-4 py-4 font-medium text-slate-800">{programHighlight.title}</td>

                      <td className="px-4 py-4 text-slate-700">{previewText(programHighlight.description)}</td>

                      <td className="px-4 py-4">
                        {programHighlight.logo ? (
                          <img
                            src={`/storage/${programHighlight.logo}`}
                            alt={programHighlight.title}
                            className="h-14 w-14 rounded-lg border border-emerald-100  object-cover"
                          />
                        ) : (
                          '—'
                        )}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/program-highlights/${programHighlight.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(programHighlight.id)}
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
  <AdminLayout currentRoute="program-highlights.index">{page}</AdminLayout>
);