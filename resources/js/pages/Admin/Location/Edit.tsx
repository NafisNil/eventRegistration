import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import LocationForm from './Form';

interface Location {
  id: number;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  map?: string | null;
}

interface EditProps {
  location: Location;
}

export default function Edit({ location }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/locations/${location.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Location updated',
          text: 'The location was updated successfully.',
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
      <Head title="Edit Location" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Event Details</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Location</h1>
          <Link href="/locations" className="text-sm text-emerald-200 hover:underline">
            Back to list
          </Link>
        </div>

        <LocationForm
          initialData={{
            address: location.address ?? '',
            phone: location.phone ?? '',
            email: location.email ?? '',
            map: location.map ?? '',
          }}
          submitLabel="Update Location"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="locations.index">{page}</AdminLayout>
);