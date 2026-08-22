import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  description?: string;
  reasonToAttend?: string;
  objectives?: string;
  eligibility?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description = "The National Innovation & Digital Governance Summit 2026 is an official convening designed to accelerate the adoption of responsible digital technology across public institutions. Across keynote addresses, expert panels and hands-on workshops, participants will examine how data, artificial intelligence and citizen-centred design can improve the delivery of essential services.",
  reasonToAttend = "Public institutions are digitising rapidly, but progress remains uneven across sectors and regions. This summit was established to create a shared national forum where practitioners can exchange evidence, align on standards and build lasting partnerships.",
  objectives = "Advance a shared national roadmap for digital public infrastructure\nShowcase proven innovations from government, academia and industry\nStrengthen capacity in data governance, privacy and cyber-resilience\nBuild durable cross-sector partnerships and collaboration channels",
  eligibility = "Government officials, university faculty and researchers, technology professionals, startup founders, development-sector practitioners and postgraduate students.",
}) => {
  const objectiveList = objectives
    .split(/\n|\r\n|\r/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="bg-[#f8f9f5] py-20 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Hero Column */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
              About the programme
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A national forum for responsible digital government
            </h2>
            <div
              className="mt-6 text-sm leading-relaxed text-slate-600 [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Right Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {/* Top-Left Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Why it is organised
              </h3>
              <div
                className="mt-3 text-sm leading-relaxed text-slate-600 [&_p]:mb-0"
                dangerouslySetInnerHTML={{ __html: reasonToAttend }}
              />
            </div>

            {/* Top-Right Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm">
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Who can participate
              </h3>
              <div
                className="mt-3 text-sm leading-relaxed text-slate-600 [&_p]:mb-0"
                dangerouslySetInnerHTML={{ __html: eligibility }}
              />
            </div>

            {/* Bottom Full-Width Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm sm:col-span-2">
              <h3 className="mb-4 font-serif text-lg font-semibold text-slate-900">
                Main objectives
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {objectiveList.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    <span dangerouslySetInnerHTML={{ __html: obj }} />
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-slate-100 pt-5">
                <Link
                  href="/about_us"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 transition-colors hover:text-emerald-700"
                >
                  Read the full programme overview <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};