import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Header } from "../../components/Frontend/Header";
import { Footer } from "../../components/Frontend/Footer";

interface EventStatRecord {
  event_name?: string | null;
}

interface AboutRecord {
  description?: string | null;
}

interface LocationRecord {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  map?: string | null;
}

interface SocialMediaRecord {
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
}

interface ContactProps {
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
  socialMedia?: SocialMediaRecord | null;
}

export default function ContactPage({ eventStat, about, location, socialMedia }: ContactProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const footerDescription = about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.";
  const footerEmail = location?.email || "secretariat@digitalsummit.gov.bd";
  const address = location?.address || "Secretariat Office, 12 Republic Avenue, Dhaka 1207";
  const phone = location?.phone || "+880 2 5566 7788";
  const email = location?.email || "info@ndgsummit.org";
  const mapUrl = location?.map || "https://www.google.com/maps?q=Dhaka&output=embed";

  const socialLinks = [
    { key: "facebook", url: socialMedia?.facebook, Icon: Facebook },
    { key: "linkedin", url: socialMedia?.linkedin, Icon: Linkedin },
    { key: "youtube", url: socialMedia?.youtube, Icon: Youtube },
    { key: "twitter", url: socialMedia?.twitter, Icon: Twitter },
  ].filter(
    (link): link is { key: string; url: string; Icon: typeof Facebook } => Boolean(link.url),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.post("/contact_message", form, {
      preserveScroll: true,
      onSuccess: () => {
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <Header eventName={eventName} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[1.5rem] border border-slate-300 bg-[#f3f4f4] p-5 shadow-[0_8px_26px_rgba(15,23,42,0.05)] md:p-7">
            <h1 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-slate-800 md:text-[2.2rem] md:leading-[1.1]">
              {eventName}
            </h1>

            <div className="mt-7 space-y-4 text-slate-700">
              <div className="flex items-center gap-3 text-[1rem]">
                <MapPin className="h-4 w-4 shrink-0 text-[#b77d3f]" />
                <div
                  className="[&_p]:m-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                  dangerouslySetInnerHTML={{ __html: address }}
                />
              </div>

              <div className="flex items-center gap-3 text-[1rem]">
                <Phone className="h-4 w-4 shrink-0 text-[#b77d3f]" />
                <span>{phone}</span>
              </div>

              <div className="flex items-center gap-3 text-[1rem]">
                <Mail className="h-4 w-4 shrink-0 text-[#b77d3f]" />
                <span>{email}</span>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-7 flex items-center gap-3">
                {socialLinks.map(({ key, url, Icon }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </section>

          <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-slate-300 bg-[#f3f4f4] p-5 shadow-[0_8px_26px_rgba(15,23,42,0.05)] md:p-7">
            <h2 className="text-[1.8rem] font-semibold tracking-[-0.05em] text-slate-800 md:text-[2.1rem] md:leading-[1.1]">
              Send a message
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-slate-700">
                <span className="mb-2 block">Your name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  name="name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                />
              </label>

              <label className="block text-sm text-slate-700">
                <span className="mb-2 block">Email address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  name="email"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                />
              </label>

              <label className="block text-sm text-slate-700">
                <span className="mb-2 block">Phone (optional)</span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  name="phone"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                />
              </label>

              <label className="block text-sm text-slate-700">
                <span className="mb-2 block">Subject</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  name="subject"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm text-slate-700">
              <span className="mb-2 block">Message</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                name="message"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-800 outline-none transition focus:border-slate-400"
              />
            </label>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#c98f4f] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(201,143,79,0.25)] transition hover:bg-[#b67d3d]"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-300 bg-white shadow-[0_8px_26px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-[#f3f4f4] px-5 py-3 text-lg font-medium text-slate-700">
            <MapPin className="h-5 w-5 text-[#b77d3f]" />
            <span>Open in Maps</span>
          </div>

          <div className="h-[300px] w-full bg-slate-200">
            <iframe
              title="Event location map"
              src={mapUrl}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} socialMedia={socialMedia} />
    </div>
  );
}