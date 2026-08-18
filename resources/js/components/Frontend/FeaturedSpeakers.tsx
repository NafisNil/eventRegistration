import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface Guest {
  id: number;
  name: string;
  designation: string;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
}

interface FeaturedSpeakersProps {
  guests?: Guest[];
}

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `/storage/${value.replace(/^\//, "")}`;
};

export const FeaturedSpeakers: React.FC<FeaturedSpeakersProps> = ({ guests = [] }) => {
  return (
    <section className="border-t border-emerald-100 bg-[#f7faf5] py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Featured guests</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Speakers leading the conversation</h2>
            <p className="mt-1 text-sm text-slate-600">Senior officials, researchers and practitioners shaping digital public services.</p>
          </div>
          <Link href="/guests" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-600 md:mt-0">
            All guests & speakers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guests.map((speaker) => {
            const resolvedLogo = getPublicAssetUrl(speaker.logo) || "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=600&q=80";

            return (
              <div key={speaker.id} className="flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={resolvedLogo}
                    alt={speaker.name}
                    className="h-full w-full object-cover grayscale contrast-125 transition-all duration-300 hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{speaker.name}</h3>
                    <p className="mt-1 text-xs font-medium text-emerald-700">{speaker.designation}</p>
                    <p className="mb-4 text-xs text-slate-600">{speaker.expertise || "Public sector leader"}</p>
                    <div
                      className="text-xs leading-relaxed text-slate-700 [&_p]:mb-2 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                      dangerouslySetInnerHTML={{ __html: speaker.description || "Featured guest contributing to the event conversation." }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};