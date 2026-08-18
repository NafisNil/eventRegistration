import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import AnnouncementForm from './Form';

interface Announcement {
  id: number;
  title: string;
  time?: string | null;
  badge?: string | null;
  location?: string | null;
  keynote_speaker?: string | null;

  description?: string | null;


}

interface EditProps {
  announcement: Announcement;
}

export default function Edit({ announcement }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/announcements/${announcement.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Announcement updated',
          text: 'The announcement was updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Validation failed',
          text: 'Please check the form and try again.',
        });
      },
    });
  };

  return (
    <>
      <Head title="Edit Announcement" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Announcement</h1>
          <Link href="/announcements" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <AnnouncementForm
          initialData={{
            title: announcement.title,
            description: announcement.description ?? '',

          }}
          submitLabel="Update Announcement"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="announcements.index">{page}</AdminLayout>
);