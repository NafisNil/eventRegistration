import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import HeroForm from './Form';
import { Link } from '@inertiajs/react';

interface Hero {
  id: number;
  description: string;
  logo?: string | null;
}

interface EditProps {
  hero: Hero;
}

export default function Edit({ hero }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/heroes/${hero.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Hero updated',
          text: 'The hero was updated successfully.',
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
      <Head title="Edit Hero" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Hero</h1>
            <Link href="/heroes" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </Link>
        </div>

        <HeroForm
          initialData={{
            description: hero.description,
            logo: hero.logo,
          }}
          submitLabel="Update Hero"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="heroes.index">{page}</AdminLayout>
);