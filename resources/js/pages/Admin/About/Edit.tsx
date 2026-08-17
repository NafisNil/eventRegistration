import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import AboutForm from './Form';
import { Link } from '@inertiajs/react';

interface About {
  id: number;
  description: string;
  reason_to_attend?: string | null;
  objectives?: string | null;
  eligibility?: string | null;
}

interface EditProps {
  about: About;
}

export default function Edit({ about }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/about/${about.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'About updated',
          text: 'The about was updated successfully.',
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
      <Head title="Edit About" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit About</h1>
            <Link href="/about" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </Link>
        </div>

        <AboutForm
          initialData={{
            description: about.description,
            reason_to_attend: about.reason_to_attend,
            objectives: about.objectives,
            eligibility: about.eligibility,
          }}
          submitLabel="Update About"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="about.index">{page}</AdminLayout>
);