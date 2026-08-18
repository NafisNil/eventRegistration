import { Head } from '@inertiajs/react';
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  created_at?: string | null;
}

interface IndexProps {
  contactMessages?: ContactMessage[];
}

const previewText = (value?: string | null) => {
  if (!value) return '—';

  const plainText = value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= 90) {
    return plainText;
  }

  return `${plainText.slice(0, 90)}...`;
};

export default function Index({ contactMessages = [] }: IndexProps) {
  return (
    <>
      <Head title="Contact Messages" />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Inbox</p>
            <h1 className="mt-2 text-2xl font-bold">Contact Messages</h1>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          {contactMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No contact messages found yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200 text-left text-sm text-slate-700">
                <thead className="bg-emerald-50/70 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Subject</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-emerald-100">
                  {contactMessages.map((message) => (
                    <tr key={message.id} className="align-top">
                      <td className="px-4 py-4 font-medium text-slate-900">{message.name}</td>
                      <td className="px-4 py-4 text-slate-700">{message.email}</td>
                      <td className="px-4 py-4 text-slate-700">{message.phone || '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{message.subject || '—'}</td>
                      <td className="px-4 py-4 text-slate-700">{previewText(message.message)}</td>
                      <td className="px-4 py-4 text-slate-700">
                        {message.created_at ? new Date(message.created_at).toLocaleString() : '—'}
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
  <AdminLayout currentRoute="contact.messages">{page}</AdminLayout>
);