import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import PartnershipCategoryForm from './Form';

interface PartnershipCategory {
  id: number;
  name?: string | null;
}



interface EditProps {
  partnershipCategory: PartnershipCategory;
}

export default function Edit({ partnershipCategory }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/partnership-categories/${partnershipCategory.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Partnership Category updated',
          text: 'The partnership category was updated successfully.',
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
      <Head title="Edit Partnership Category" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Partnership Category</h1>
          <Link href="/partnership-categories" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <PartnershipCategoryForm
          initialData={{
            name: partnershipCategory.name ?? '',

          }}
          submitLabel="Update Partnership Category"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="partnership-categories.index">{page}</AdminLayout>
);