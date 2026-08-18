import React from "react";
import { Header } from "../../components/Frontend/Header";
import { Footer } from "../../components/Frontend/Footer";

interface AnnouncementRecord {
  id: number;
  title: string;
  description?: string | null;
  created_at?: string | null;
}

interface EventStatRecord {
  event_name?: string | null;
}

interface AboutRecord {
  description?: string | null;
}

interface LocationRecord {
  email?: string | null;
}

interface AnnouncementsProps {
  announcements?: AnnouncementRecord[];
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
}

const formatAnnouncementDate = (date?: string | null) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();
};

export default function AnnouncementsPage({
  announcements = [],
  eventStat,
  about,
  location,
}: AnnouncementsProps) {
  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const footerDescription = about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.";
  const footerEmail = location?.email || "secretariat@digitalsummit.gov.bd";

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900">
      <Header eventName={eventName} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="space-y-6">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.3rem] border border-emerald-100 bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)] md:p-6"
            >
              <div className="mb-3 flex items-center gap-2 text-[0.6rem] font-medium text-emerald-700 md:text-[0.8rem]">
                <span aria-hidden="true">🔔</span>
                <span>{formatAnnouncementDate(item.created_at) || "DATE TBD"}</span>
              </div>

              <h2 className="text-[1rem] font-bold tracking-[-0.04em] text-slate-800 md:text-[1.5rem]">
                {item.title}
              </h2>

              <div
                className="mt-4 text-[0.75rem] leading-7 text-slate-700 md:text-[0.8rem] md:leading-8 [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: item.description || "Announcement details will be published soon.",
                }}
              />
            </article>
          ))}
        </div>
      </main>

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} />
    </div>
  );
}