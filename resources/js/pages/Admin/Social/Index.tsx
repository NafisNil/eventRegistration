import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface SocialMedia {
  id: number;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
}

interface IndexProps {
  socialMedia?: SocialMedia[];
}

export default function Index({ socialMedia = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete social media link?',
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

      router.delete(`/social-media/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Social media link deleted',
            text: 'The social media link was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="Social Media" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
            <h1 className="mt-2 text-2xl font-bold">Social Media</h1>
          </div>
          {socialMedia.length === 0 ? (
            <Link
              href="/social-media/create"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Add Social Media
            </Link>
          ) : (
            <Link
              href={`/social-media/${socialMedia[0].id}/edit`}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Edit Social Media
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {socialMedia.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No social media links found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Facebook</th>
                    <th className="px-4 py-3 font-semibold">LinkedIn</th>
                    <th className="px-4 py-3 font-semibold">YouTube</th>
                    <th className="px-4 py-3 font-semibold">Twitter</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {socialMedia.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="px-4 py-4 text-slate-700">{item.facebook ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{item.linkedin ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{item.youtube ?? '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{item.twitter ?? '—'}</td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/social-media/${item.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
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
  <AdminLayout currentRoute="social-media.index">{page}</AdminLayout>
);