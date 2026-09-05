import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import LeadershipForm from './Form';

interface Leadership {
  id: number;
  name: string;
  role?: string | null;
  ministry?: string | null;
  logo?: string | null;
}

interface EditProps {
  leadership: Leadership;
}

export default function Edit({ leadership }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/leaderships/${leadership.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Leadership updated',
          text: 'The leadership entry was updated successfully.',
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
      <Head title="Edit Leadership" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Leadership</h1>
          <Link href="/leaderships" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <LeadershipForm
          initialData={{
            name: leadership.name,
            role: leadership.role ?? '',
            ministry: leadership.ministry ?? '',
            logo: leadership.logo ?? null,
          }}
          submitLabel="Update Leadership"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="leaderships.index">{page}</AdminLayout>
);