import React, { useMemo, useState } from "react";
import { Header } from "../../components/Frontend/Header";
import { Footer } from "../../components/Frontend/Footer";

interface GuestRecord {
  id: number;
  name: string;
  designation?: string | null;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
  type?: string | null;
}

interface AboutRecord {
  description?: string | null;
}

interface EventStatRecord {
  event_name?: string | null;
}

interface LocationRecord {
  email?: string | null;
}

interface SocialMediaRecord {
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
}

interface GuestsProps {
  guests?: GuestRecord[];
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
  socialMedia?: SocialMediaRecord | null;
}

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `/storage/${value.replace(/^\//, "")}`;
};

const truncateText = (value?: string | null, maxLength = 100) => {
  if (!value) return "";

  const plainText = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trim()}...`;
};

const formatDescriptionText = (value?: string | null) => {
  if (!value) return "Featured guest contributing to this event.";

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+\n/g, "\n")
    .trim();
};

const parseExpertiseTags = (value?: string | null) => {
  if (!value) return [];

  return value
    .split(/[|,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
};

export default function GuestsPage({ guests = [], eventStat, about, location, socialMedia }: GuestsProps) {
  const [selectedGuest, setSelectedGuest] = useState<GuestRecord | null>(null);

  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const footerDescription = about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.";
  const footerEmail = location?.email || "secretariat@digitalsummit.gov.bd";

  const guestList = useMemo(() => guests.filter((guest) => guest && guest.name), [guests]);

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900">
      <Header eventName={eventName} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-2 gap-2.5 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guestList.map((guest) => {
            const logo = getPublicAssetUrl(guest.logo) || "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=1200&q=80";
            const preview = truncateText(guest.description ?? "", 100);
            const guestTypeLabel = (guest.type || "Featured Guest").toUpperCase();

            return (
              <article
                key={guest.id}
                className="flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <div className="relative h-[200px] overflow-hidden bg-slate-100">
                  <img src={logo} alt={guest.name} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-[#d8b877] px-2 py-1 text-[0.52rem] font-black uppercase tracking-[0.12em] text-slate-900 shadow-sm">
                    {guestTypeLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <h3 className="text-[0.96rem] font-semibold tracking-tight text-slate-800 sm:text-[1.02rem]">
                      {guest.name}
                    </h3>

                    <div className="mt-1 text-[0.67rem] leading-5 text-slate-600">
                      <span className="text-emerald-700">{guest.designation || "Guest speaker"}</span>
                    </div>

                    <p className="mt-2.5 text-[0.82rem] leading-5 text-slate-600">
                      {preview || "Featured guest contributing to the event conversation."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedGuest(guest)}
                    className="mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[0.72rem] font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                  >
                    View profile
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-3 py-4 backdrop-blur-[1px] sm:px-4 sm:py-6">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] border border-emerald-100 bg-[#f4f5f4] shadow-[0_18px_60px_rgba(15,23,42,0.22)]">
            <button
              type="button"
              onClick={() => setSelectedGuest(null)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-2xl text-emerald-700 transition hover:bg-emerald-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
              aria-label="Close profile"
            >
              ×
            </button>

            <div className="px-4 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-8">
              <h2 className="pr-10 text-2xl font-semibold tracking-tight text-slate-800 sm:pr-12 sm:text-3xl lg:text-4xl">
                {selectedGuest.name}
              </h2>

              <div className="mt-5 grid gap-4 sm:gap-5 lg:mt-6 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-6">
                <div className="relative overflow-hidden rounded-[1.1rem] bg-slate-200 lg:max-w-[220px]">
                  <img
                    src={getPublicAssetUrl(selectedGuest.logo) || "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=1200&q=80"}
                    alt={selectedGuest.name}
                    className="h-[280px] w-full object-cover sm:h-[320px] lg:h-[420px] lg:w-full lg:object-cover"
                  />
                  <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-[#d8b877] px-2 py-1 text-[0.52rem] font-black uppercase tracking-[0.12em] text-slate-900 shadow-sm">
                    {(selectedGuest.type || "Featured Guest").toUpperCase()}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-700 sm:text-[1rem] lg:text-[1.2rem]">
                    {selectedGuest.designation || "Guest speaker"}
                  </div>

                  {selectedGuest.expertise && (
                    <div className="mt-3 inline-block text-xs font-medium italic text-slate-500 sm:text-sm">
                      {selectedGuest.expertise}
                    </div>
                  )}



                  <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                    {formatDescriptionText(selectedGuest.description)}
                  </p>

                  {parseExpertiseTags(selectedGuest.expertise).length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                      {parseExpertiseTags(selectedGuest.expertise).map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="inline-flex items-center justify-center rounded-lg bg-slate-200/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 sm:px-3 sm:py-2 sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} socialMedia={socialMedia} />
    </div>
  );
}