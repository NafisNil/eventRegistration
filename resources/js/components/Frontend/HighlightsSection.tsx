import React from "react";
import { Sparkles, Users, ShieldCheck, Layers, Building2, Award } from "lucide-react";

interface ProgramHighlight {
  id: number;
  title: string;
  description?: string | null;
  logo?: string | null;
}

interface HighlightsSectionProps {
  highlights?: ProgramHighlight[];
}

const fallbackIcons = [Sparkles, Users, ShieldCheck, Layers, Building2, Award];

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `/storage/${value.replace(/^\//, "")}`;
};

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({ highlights = [] }) => {
  const items = highlights.length > 0 ? highlights : [
    { id: 1, title: "Keynote addresses", description: "National leaders set out the reform agenda for the digital decade.", logo: null },
    { id: 2, title: "Expert panels", description: "Cross-sector discussions on scaling proven public-service innovations.", logo: null },
    { id: 3, title: "Hands-on workshops", description: "Practical clinics on data protection, privacy and cyber-resilience.", logo: null },
    { id: 4, title: "Innovation showcase", description: "Live demonstrations from ministries, universities and startups.", logo: null },
    { id: 5, title: "Structured networking", description: "Curated sector tables designed to build lasting partnerships.", logo: null },
    { id: 6, title: "Certification", description: "Participation certificates issued at the closing ceremony.", logo: null },
  ];

  return (
    <section className="border-t border-emerald-100 bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Programme highlights</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Key Discussion Topics</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = fallbackIcons[idx % fallbackIcons.length];
            const resolvedLogo = getPublicAssetUrl(item.logo);

            return (
              <div key={item.id ?? idx} className="rounded-xl border border-emerald-100 bg-[#f7faf5] p-6 transition-colors hover:border-emerald-200">
                <div className="mb-4 flex items-center gap-4">
                  {resolvedLogo ? (
                    <img src={resolvedLogo} alt={item.title} className="h-10 w-10 rounded-lg border border-emerald-100 bg-white object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                <div
                  className="text-sm leading-relaxed text-slate-700 [&_p]:mb-2 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};