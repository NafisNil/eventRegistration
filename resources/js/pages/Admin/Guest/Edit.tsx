import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import GuestForm from './Form';

interface Guest {
  id: number;
  name: string;
  designation: string;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
}

interface EditProps {
  guest: Guest;
}

export default function Edit({ guest }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/guests/${guest.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guest updated',
          text: 'The guest was updated successfully.',
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
      <Head title="Edit Guest" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Guest</h1>
          <Link href="/guests" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <GuestForm
          initialData={{
            name: guest.name,
            designation: guest.designation,
            description: guest.description ?? '',
            logo: guest.logo ?? null,
            expertise: guest.expertise ?? '',
          }}
          submitLabel="Update Guest"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="guests.index">{page}</AdminLayout>
);