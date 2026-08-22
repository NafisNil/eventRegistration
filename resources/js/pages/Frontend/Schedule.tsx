import React, { useMemo, useState } from "react";
import { Header } from "../../components/Frontend/Header";
import { Footer } from "../../components/Frontend/Footer";

interface ScheduleItem {
  id: number;
  time?: string | null;
  badge?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  keynote_speaker?: string | null;
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

interface ScheduleProps {
  schedules?: ScheduleItem[];
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  location?: LocationRecord | null;
  socialMedia?: SocialMediaRecord | null;
}

export default function SchedulePage({ schedules = [], eventStat, about, location, socialMedia }: ScheduleProps) {
  const [selectedBadge, setSelectedBadge] = useState<string>("All");

  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const footerDescription = about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.";
  const footerEmail = location?.email || "secretariat@digitalsummit.gov.bd";

  const filters = useMemo(() => {
    const values = schedules
      .map((item) => item.badge?.trim())
      .filter((value): value is string => Boolean(value));

    return ["All", ...Array.from(new Set(values))];
  }, [schedules]);

  const visibleSchedules = useMemo(() => {
    if (selectedBadge === "All") {
      return schedules;
    }

    return schedules.filter((item) => item.badge?.trim() === selectedBadge);
  }, [selectedBadge, schedules]);

  return (
    <div className="min-h-screen bg-[#f7faf5] text-slate-900">
      <Header eventName={eventName} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Event schedule</span>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">A single, focused day</h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">14 November 2026 · 09:00 AM – 05:30 PM</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => setSelectedBadge(badge)}
              className={[
                "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                selectedBadge === badge
                  ? "border-emerald-200 bg-emerald-600 text-white shadow-sm"
                  : "border-emerald-100 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700",
              ].join(" ")}
            >
              {badge}
            </button>
          ))}
        </div>

        <div className="max-w-4xl space-y-4">
          {visibleSchedules.map((item, idx) => (
            <div
              key={item.id ?? idx}
              className="flex flex-col justify-between gap-4 rounded-sm border border-emerald-100 bg-white p-5 md:flex-row md:items-center"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="font-semibold text-emerald-700">{item.time || "TBA"}</span>
                  <span>•</span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">{item.badge || "Session"}</span>
                </div>

                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="text-xs text-slate-600">{item.description || "Session information will be updated soon."}</p>
              </div>

              <div className="flex shrink-0 items-center gap-4 border-t border-emerald-100 pt-3 text-[11px] text-slate-500 md:border-t-0 md:pt-0">
                {item.keynote_speaker && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600">●</span>
                    {item.keynote_speaker}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600">●</span>
                  {item.location || "To be announced"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer eventName={eventName} description={footerDescription} email={footerEmail} socialMedia={socialMedia} />
    </div>
  );
}