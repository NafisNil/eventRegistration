import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import ParticipantTypeForm from './Form';

export default function Create() {
  const handleSubmit = (formData: FormData) => {
    router.post('/participant-types', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Participant Type created',
          text: 'The participant type was created successfully.',
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
      <Head title="Create Participant Type" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Create Participant Type</h1>
            <a href="/participant-types" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </a>
        </div>

        <ParticipantTypeForm submitLabel="Create Participant Type" onSubmit={handleSubmit} />
      </div>
    </>
  );
}

Create.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="participant-types.index">{page}</AdminLayout>
);