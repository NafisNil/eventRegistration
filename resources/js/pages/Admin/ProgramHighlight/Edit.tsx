import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import ProgramHighlightForm from './Form';

interface ProgramHighlight {
  id: number;
  title: string;

  description?: string | null;
  logo?: string | null;

}

interface EditProps {
  programHighlight: ProgramHighlight;
}

export default function Edit({ programHighlight }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/program-highlights/${programHighlight.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Program Highlight updated',
          text: 'The program highlight was updated successfully.',
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
      <Head title="Edit Program Highlight" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Program Highlight</h1>
          <Link href="/program-highlights" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <ProgramHighlightForm
          initialData={{
            title: programHighlight.title,

            description: programHighlight.description ?? '',
            logo: programHighlight.logo ?? null,

          }}
          submitLabel="Update Program Highlight"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="program-highlights.index">{page}</AdminLayout>
);