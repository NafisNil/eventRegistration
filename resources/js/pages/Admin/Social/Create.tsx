import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import SocialMediaForm from './Form';

export default function Create() {
  const handleSubmit = (formData: FormData) => {
    router.post('/social-media', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Social media created',
          text: 'The social media links were created successfully.',
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
      <Head title="Create Social Media" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Create Social Media</h1>
          <a href="/social-media" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </a>
        </div>

        <SocialMediaForm submitLabel="Create Social Media" onSubmit={handleSubmit} />
      </div>
    </>
  );
}

Create.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="social-media.index">{page}</AdminLayout>
);