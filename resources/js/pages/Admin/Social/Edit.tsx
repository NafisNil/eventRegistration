import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import SocialMediaForm from './Form';

interface SocialMedia {
  id: number;
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
}

interface EditProps {
  socialMedia?: SocialMedia;
  social_medium?: SocialMedia;
}

export default function Edit({ socialMedia, social_medium }: EditProps) {
  const record = socialMedia ?? social_medium;

  if (!record) {
    return null;
  }

  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/social-media/${record.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Social media updated',
          text: 'The social media links were updated successfully.',
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
      <Head title="Edit Social Media" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Social Media</h1>
          <Link href="/social-media" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <SocialMediaForm
          initialData={{
            facebook: record.facebook ?? '',
            linkedin: record.linkedin ?? '',
            youtube: record.youtube ?? '',
            twitter: record.twitter ?? '',
          }}
          submitLabel="Update Social Media"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="social-media.index">{page}</AdminLayout>
);