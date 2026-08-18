import React from "react";

interface QuickStatsProps {
  eventDate?: string;
  eventTime?: string;
  location?: string;
  registrationDeadline?: string;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  eventDate = "14 November 2026",
  eventTime = "09:00 AM – 05:30 PM",
  location = "Grand National Convention Centre",
  registrationDeadline = "1 November 2026",
}) => {
  return (
    <section className="border-y border-emerald-100 bg-white py-8 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Event date</p>
            <p className="text-base font-semibold text-slate-900">{eventDate}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Event time</p>
            <p className="text-base font-semibold text-slate-900">{eventTime}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Venue</p>
            <div
              className="text-base font-semibold text-slate-900 [&_p]:m-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: location }}
            />
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Registration deadline</p>
            <p className="text-base font-semibold text-emerald-700">{registrationDeadline}</p>
          </div>
        </div>
      </div>
    </section>
  );
};