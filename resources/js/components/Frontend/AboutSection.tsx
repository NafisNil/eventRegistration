import React from "react";
import { Link } from "@inertiajs/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  description?: string;
  reasonToAttend?: string;
  objectives?: string;
  eligibility?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description = "The National Innovation & Digital Governance Summit 2026 is an official convening designed to accelerate the adoption of responsible digital technology across public institutions.",
  reasonToAttend = "Public institutions are digitising rapidly, but progress remains uneven across sectors and regions. This summit was established to create a shared national forum where practitioners can exchange evidence, align on standards and build lasting partnerships.",
  objectives = "Advance a shared national roadmap for digital public infrastructure\nShowcase proven innovations from government, academia and industry\nStrengthen capacity in data governance, privacy and cyber-resilience\nBuild durable cross-sector partnerships and collaboration channels",
  eligibility = "This forum is designed for public leaders, policy professionals, digital service teams, researchers, technologists and civil society actors working in the governance and public innovation space.",
}) => {
  const objectiveList = objectives
    .split(/\n|\r\n|\r/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="bg-[#f7faf5] py-20 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">About the programme</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">A national forum for public sector innovation</h2>
            <div
              className="leading-relaxed text-slate-700 [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Why it is organised</h3>
              <div
                className="text-sm leading-relaxed text-slate-700 [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: reasonToAttend }}
              />
            </div>

            <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Main objectives</h3>
              <ul className="space-y-3">
                {objectiveList.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span dangerouslySetInnerHTML={{ __html: obj }} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-emerald-100 pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-600">
                  Read the full programme overview <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-900">Who should attend</h3>
              <div
                className="text-sm leading-relaxed text-slate-700 [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: eligibility }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};