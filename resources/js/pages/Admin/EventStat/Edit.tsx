import { Head, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';
import EventStatForm from './Form';
import { Link } from '@inertiajs/react';

interface EventStat {
  id: number;
  event_name: string;
  location: string;
  event_date: string;
  time: string;
  registration_deadline: string;
  target_participants?: string | null;
}

interface EditProps {
  eventStat: EventStat;
}

export default function Edit({ eventStat }: EditProps) {
  const handleSubmit = (formData: FormData) => {
    formData.append('_method', 'PUT');

    router.post(`/event-stats/${eventStat.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Event Stat updated',
          text: 'The event stat was updated successfully.',
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
      <Head title="Edit Event Stat" />

      <div className="space-y-4">
        <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
          <h1 className="mt-2 text-2xl font-bold">Edit Event Stat</h1>
            <Link href="/event-stats" className="text-sm text-emerald-200 hover:underline">
              Back to list
            </Link>
        </div>

        <EventStatForm
          initialData={{
            event_name: eventStat.event_name,
            location: eventStat.location,
            event_date: eventStat.event_date,
            time: eventStat.time,
            registration_deadline: eventStat.registration_deadline,
            target_participants: eventStat.target_participants,
          }}
          submitLabel="Update Event Stat"
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

Edit.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="event-stats.index">{page}</AdminLayout>
);