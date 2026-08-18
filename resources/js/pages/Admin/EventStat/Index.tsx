import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '@/layouts/AdminLayout';

interface EventStat {
  id: number;
  event_name: string;
  location: string;
  event_date: string;
  time: string;
  registration_deadline: string;
  target_participants?: string | null;
  organizer?: string | null;
}

interface IndexProps {
  eventStats?: EventStat[];
}

export default function Index({ eventStats = [] }: IndexProps) {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete event stat?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      router.delete(`/event-stats/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Event stat deleted',
            text: 'The event stat was deleted successfully.',
            timer: 2000,
            showConfirmButton: false,
          });
        },
      });
    });
  };

  return (
    <>
      <Head title="Event Stats" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Media & Branding</p>
            <h1 className="mt-2 text-2xl font-bold">Event Stat Management</h1>
          </div>
          {eventStats.length === 0 ? (
            <Link
              href="/event-stats/create"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Add Event Stat
            </Link>
          ) : (
            <Link
              href={`/event-stats/${eventStats[0].id}/edit`}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Edit Event Stat
            </Link>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {eventStats.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No event stats found yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Event Name</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Event Date</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Registration Deadline</th>
                    <th className="px-4 py-3 font-semibold">Target Participants</th>
                    <th className="px-4 py-3 font-semibold">Organizer</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {eventStats.map((eventStat) => (
                    <tr key={eventStat.id} className="align-top">
                      <td className="px-4 py-4 font-medium text-slate-800">{eventStat.event_name}</td>

                      <td className="px-4 py-4">
                        <div
                          className="prose prose-emerald max-w-none text-sm text-slate-700"
                          dangerouslySetInnerHTML={{ __html: eventStat.location }}
                        />
                      </td>

                      <td className="px-4 py-4">{eventStat.event_date}</td>
                      <td className="px-4 py-4">{eventStat.time}</td>
                      <td className="px-4 py-4">{eventStat.registration_deadline}</td>
                      <td className="px-4 py-4">{eventStat.target_participants ?? '—'}</td>
                      <td className="px-4 py-4">{eventStat.organizer ?? '—'}</td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/event-stats/${eventStat.id}/edit`}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(eventStat.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Index.layout = (page: React.ReactNode) => (
  <AdminLayout currentRoute="event-stats.index">{page}</AdminLayout>
);