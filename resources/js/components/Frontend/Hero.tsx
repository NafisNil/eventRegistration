import React from "react";
import { Link } from "@inertiajs/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface HeroProps {
  eventName?: string;
  eventDate?: string;
  location?: string;
  description?: string;
  logo?: string;
}

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `/storage/${value.replace(/^\//, "")}`;
};

export const Hero: React.FC<HeroProps> = ({
  eventName = "National Innovation & Digital Governance Summit 2026",
  eventDate = "14 November 2026",
  location = "Grand National Convention Centre",
  description = "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.",
  logo = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80",
}) => {
  const resolvedLogo = getPublicAssetUrl(logo) || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80";

  return (
    <section className="relative overflow-hidden bg-[#f7faf5] py-24 text-slate-900 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-0 sm:opacity-100">
        <img
          src={resolvedLogo}
          alt={eventName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7faf5a9] via-[#f7faf5]/90 to-[#f7faf5]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Official event platform
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {eventName}
          </h1>

          <div
            className="hero-rich-text mb-10 text-base leading-relaxed text-slate-700 sm:text-lg [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="mb-10 flex flex-wrap gap-6 border-b border-emerald-100 pb-8 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <div>
                <span className="block text-xs text-slate-500">Date</span>
                <span className="font-semibold text-slate-900">{eventDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <div>
                <span className="block text-xs text-slate-500">Location</span>
                <div
                  className="font-semibold text-slate-900 [&_p]:m-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                  dangerouslySetInnerHTML={{ __html: location }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/user_register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-500"
            >
              Register Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/schedule_list"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-6 py-3.5 text-base font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
            >
              View Programme
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};