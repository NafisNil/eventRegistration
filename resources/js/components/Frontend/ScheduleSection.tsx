import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { Calendar, MapPin, ArrowRight, Users } from "lucide-react";

interface ScheduleItem {
  id: number;
  time?: string | null;
  badge?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  keynote_speaker?: string | null;
}

interface ScheduleSectionProps {
  schedules?: ScheduleItem[];
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ schedules = [] }) => {
  const [selectedBadge, setSelectedBadge] = useState<string>("All");

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
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Event schedule</span>
            <h2 className="text-3xl font-bold text-white mt-2">A single, focused day</h2>
            <p className="text-slate-400 text-sm mt-1">14 November 2026 · 09:00 AM – 05:30 PM</p>
          </div>
          <Link href="/schedule" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300">
            Full schedule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-10 flex flex-wrap gap-4">
          {filters.map((badge) => (
            <button
              key={badge}
              type="button"
              onClick={() => setSelectedBadge(badge)}
              className={[
                "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                selectedBadge === badge
                  ? "border-slate-800 bg-slate-900 text-white shadow-sm"
                  : "border-slate-700 bg-slate-950/40 text-slate-200 hover:border-slate-500 hover:text-white",
              ].join(" ")}
            >
              {badge}
            </button>
          ))}
        </div>

        <div className="max-w-4xl space-y-4">
          {visibleSchedules.map((item, idx) => (
            <div key={item.id ?? idx} className="p-6 rounded-sm bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400">{item.time || "TBA"}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.badge || "Session"}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.description || "Session information will be updated soon."}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 shrink-0">
                {item.keynote_speaker && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" /> {item.keynote_speaker}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {item.location || "To be announced"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};