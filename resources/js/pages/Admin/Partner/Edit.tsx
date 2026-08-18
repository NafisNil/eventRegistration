import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import PartnerForm from './Form';

interface PartnershipCategory {
  id: number;
  name: string;
}

interface Partner {
  id: number;
  name: string;
  partnership_category_id: number;
  logo?: string | null;
}

interface EditProps {
  partner: Partner;
  partnershipCategories?: PartnershipCategory[];
}

export default function Edit({ partner, partnershipCategories = [] }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/partners/${partner.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Partner updated',
          text: 'The partner was updated successfully.',
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
      <Head title="Edit Partner" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Partner</h1>
          <Link href="/partners" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <PartnerForm
          initialData={{
            name: partner.name,
            partnership_category_id: partner.partnership_category_id,
            logo: partner.logo ?? null,
          }}
          categories={partnershipCategories}
          submitLabel="Update Partner"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="partners.index">{page}</AdminLayout>
);