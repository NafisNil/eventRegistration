import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import {
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Header } from '@/components/Frontend/Header';
import { Footer } from '@/components/Frontend/Footer';

interface EventStatRecord {
  event_name?: string | null;
  event_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  venue?: string | null;
  registration_deadline?: string | null;
}

interface AboutRecord {
  description?: string | null;
}

interface LocationRecord {
  address?: string | null;
  email?: string | null;
  phone?: string | null;
}

interface RegisterProps {
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
}

export default function RegisterPage({ eventStat, about, location }: RegisterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    participant_type: '',
    organization: '',
    designation: '',
    district: '',
    address: '',
    other_info: '',
    logo: null as File | null,
  });

  const eventName = eventStat?.event_name || 'National Innovation & Digital Governance Summit 2026';
  const footerDescription = about?.description || 'A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.';
  const footerEmail = location?.email || 'secretariat@digitalsummit.gov.bd';

  const eventDate = eventStat?.event_date || '14 November 2026';
  const startTime = eventStat?.start_time || '09:00 AM';
  const endTime = eventStat?.end_time || '05:30 PM';
  const eventVenue = location?.address || 'Hall A, Grand National Convention Centre, 12 Republic Avenue, Dhaka 1207';
  const registrationDeadline = eventStat?.registration_deadline
    ? new Date(eventStat.registration_deadline).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '1 November 2026';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    Object.entries({
      name: form.name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      participant_type: form.participant_type,
      organization: form.organization,
      designation: form.designation,
      district: form.district,
      address: form.address,
      other_info: form.other_info,
    }).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value.toString());
      }
    });

    if (form.logo) {
      formData.append('logo', form.logo);
    }

    router.post('/user_register', formData, {
      forceFormData: true,
      preserveScroll: true,
      onStart: () => {
        setIsSubmitting(true);
      },
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration completed',
          text: 'Your registration has been submitted successfully. Please check your email for your unique code and QR code.',
          timer: 2500,
          showConfirmButton: false,
        });

        setForm({
          name: '',
          email: '',
          phone: '',
          gender: '',
          participant_type: '',
          organization: '',
          designation: '',
          district: '',
          address: '',
          other_info: '',
          logo: null,
        });
      },
      onError: (errors) => {
        const errorMessages = Object.values(errors || {}).filter(Boolean);

        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: errorMessages[0] || 'Please review the form and try again.',
        });
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900">
      <Header eventName={eventName} />
      

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          <section className="flex flex-col rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-7 lg:col-span-7">
            <h1 className="text-[2.2rem] font-semibold tracking-[-0.06em] text-slate-800 md:text-[2.4rem]">
              Participant details
            </h1>

            <form id="registration-form" onSubmit={handleSubmit} className="mt-7 flex flex-1 flex-col justify-between space-y-5">
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Full name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Email address <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Mobile number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Gender <span className="text-red-500">*</span>
                    </span>
                    <div className="relative">
                      <select
                        value={form.gender}
                        onChange={(event) => setForm({ ...form, gender: event.target.value })}
                        className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-base text-slate-800 outline-none transition focus:border-slate-400"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">⌄</span>
                    </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Organisation / Institution <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(event) => setForm({ ...form, organization: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      Designation / Department <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.designation}
                      onChange={(event) => setForm({ ...form, designation: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">
                      District / City <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      value={form.district}
                      onChange={(event) => setForm({ ...form, district: event.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                      required
                    />
                  </label>

               
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Address</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(event) => setForm({ ...form, address: event.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Profile photo (optional)</span>
                  <div className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setForm({ ...form, logo: event.target.files?.[0] || null })}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700"
                    />
                  </div>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-2 block">Other relevant information</span>
                  <textarea
                    rows={3}
                    value={form.other_info}
                    onChange={(event) => setForm({ ...form, other_info: event.target.value })}
                    placeholder="Dietary requirements, accessibility needs, workshop interests..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                  />
                </label>
              </div>

              {/* Submit Button placed inside the Form Column */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl px-5 py-3 text-base font-medium text-white shadow-[0_10px_24px_rgba(16,185,129,0.18)] transition ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-slate-400 opacity-80'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit registration'}
                </button>
              </div>
            </form>
          </section>

          <aside className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-7">
              <h2 className="text-[2rem] font-semibold tracking-[-0.06em] text-slate-800">Event details</h2>

              <div className="mt-6 space-y-4 text-slate-700">
                <div className="flex items-start gap-3 text-[0.9rem]">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{eventDate}<br />{startTime} - {endTime}</span>
                </div>

                <div className="flex items-start gap-3 text-[0.9rem]">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div
                    className="[&_p]:m-0 [&_p]:leading-7 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: eventVenue }}
                  />
                </div>

                <div className="flex items-start gap-3 text-[0.9rem]">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>Registration closes : {registrationDeadline}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)] md:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.04em] text-slate-800 md:text-[1.8rem]">
                  One registration per person
                </h3>
              </div>

              <p className="mt-4 text-base leading-7 text-slate-700">
                Duplicate submissions with the same email address or mobile number are automatically rejected. All registrations are reviewed by the secretariat before final confirmation.
              </p>
            </div>
          </aside>
          
        </div>
      </main>

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} />
    </div>
  );
}