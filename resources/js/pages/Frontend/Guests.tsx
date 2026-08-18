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

interface GuestsProps {
  guests?: GuestRecord[];
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
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

const parseExpertiseTags = (value?: string | null) => {
  if (!value) return [];

  return value
    .split(/[|,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
};

export default function GuestsPage({ guests = [], eventStat, about, location }: GuestsProps) {
  const [selectedGuest, setSelectedGuest] = useState<GuestRecord | null>(null);

  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const footerDescription = about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.";
  const footerEmail = location?.email || "secretariat@digitalsummit.gov.bd";

  const guestList = useMemo(() => guests.filter((guest) => guest && guest.name), [guests]);

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900">
      <Header eventName={eventName} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guestList.map((guest) => {
            const logo = getPublicAssetUrl(guest.logo) || "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=1200&q=80";
            const preview = truncateText(guest.description ?? "", 100);

            return (
              <article
                key={guest.id}
                className="flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
              >
                <div className="h-[200px] overflow-hidden bg-slate-100">
                  <img src={logo} alt={guest.name} className="h-full w-full object-cover" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-[1px]">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-emerald-100 bg-[#f4f5f4] shadow-[0_18px_60px_rgba(15,23,42,0.22)]">
            <button
              type="button"
              onClick={() => setSelectedGuest(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-2xl text-emerald-700 transition hover:bg-emerald-100"
              aria-label="Close profile"
            >
              ×
            </button>

            <div className="px-5 py-6 sm:px-7 lg:px-8 lg:py-8">
              <h2 className="pr-12 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
                {selectedGuest.name}
              </h2>

              <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
                <div className="overflow-hidden rounded-[1.1rem] bg-slate-200">
                  <img
                    src={getPublicAssetUrl(selectedGuest.logo) || "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=1200&q=80"}
                    alt={selectedGuest.name}
                    className="h-full min-h-[280px] w-full object-cover"
                  />
                </div>

                <div>
                  <div className="text-[1rem] font-medium text-slate-700 sm:text-[1.2rem]">
                    {selectedGuest.designation || "Guest speaker"}
                  </div>

                  {selectedGuest.expertise && (
                    <div className="mt-3 inline-block text-sm font-medium italic text-slate-500">
                      {selectedGuest.expertise}
                    </div>
                  )}

                  <div className="mt-4 text-lg font-semibold leading-tight text-slate-800 sm:text-[1.5rem]">
                    Role in the programme: <span className="font-medium text-slate-700">Panelist: Inclusion by Design</span>
                  </div>

                  <div
                    className="mt-4 max-w-2xl text-base leading-7 text-slate-700"
                    dangerouslySetInnerHTML={{
                      __html: selectedGuest.description || "Featured guest contributing to this event.",
                    }}
                  />

                  {parseExpertiseTags(selectedGuest.expertise).length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {parseExpertiseTags(selectedGuest.expertise).map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="inline-flex items-center justify-center rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-medium text-slate-700"
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

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} />
    </div>
  );
}