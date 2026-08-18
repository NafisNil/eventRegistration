import React from "react";
import { Head } from "@inertiajs/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "../../components/Frontend/Header";
import { Footer } from "../../components/Frontend/Footer";
import { Link } from "@inertiajs/react";

interface AboutRecord {
  description?: string | null;
  reason_to_attend?: string | null;
  objectives?: string | null;
  eligibility?: string | null;
}

interface EventStatRecord {
  event_name?: string | null;
  location?: string | null;
  event_date?: string | null;
  time?: string | null;
  registration_deadline?: string | null;
    organizer?: string | null;
}

interface LocationRecord {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  map?: string | null;
}

interface PartnerRecord {
  id: number;
  name: string;
  logo?: string | null;
  partnership_category?: {
    name?: string | null;
  } | null;
}

interface AboutPageProps {
  about?: AboutRecord | null;
  eventStat?: EventStatRecord | null;
  location?: LocationRecord | null;
  partners?: PartnerRecord[];
}

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) {
    return "";
  }

  return `/storage/${value.replace(/^\/+/, "")}`;
};

export default function AboutPage({ about, eventStat, location, partners = [] }: AboutPageProps) {
  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const description = about?.description || "The National Innovation & Digital Governance Summit 2026 is an official convening designed to accelerate the adoption of responsible digital technology across public institutions. Across keynote addresses, expert panels and hands-on workshops, participants will examine how data, artificial intelligence and citizen-centred design can improve the delivery of essential services.";
  const reasonToAttend = about?.reason_to_attend || "Public institutions are digitising rapidly, but progress remains uneven across sectors and regions. This summit was established to create a shared national forum where practitioners can exchange evidence, align on standards and build lasting partnerships.";
  const objectives = about?.objectives || "Advance a shared national roadmap for digital public infrastructure\nShowcase proven innovations from government, academia and industry\nStrengthen capacity in data governance, privacy and cyber-resilience\nBuild durable cross-sector partnerships and collaboration channels";
  const eligibility = about?.eligibility || "This forum is designed for public leaders, policy professionals, digital service teams, researchers, technologists and civil society actors working in the governance and public innovation space.";

  const objectiveList = objectives
    .split(/\n|\r\n|\r/)
    .map((item) => item.trim())
    .filter(Boolean);

  const categories = React.useMemo(() => {
    const grouped = new Map<string, PartnerRecord[]>();

    for (const partner of partners) {
      const categoryName = partner.partnership_category?.name || "General";
      const existing = grouped.get(categoryName) ?? [];
      existing.push(partner);
      grouped.set(categoryName, existing);
    }

    return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }));
  }, [partners]);

  const formattedDate = eventStat?.event_date
    ? new Date(eventStat.event_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "14 November 2026";

  const formattedDeadline = eventStat?.registration_deadline
    ? new Date(eventStat.registration_deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "1 November 2026";

  const formattedAddress = location?.address || "Hall A, Grand National Convention Centre, 12 Republic Avenue, Dhaka 1207";
  const formattedVenue = eventStat?.location || "Grand National Convention Centre";

  return (
    <>
      <Head title={`${eventName} | About`} />

      <div className="min-h-screen bg-[#f7faf5] text-slate-900 antialiased">
        <Header eventName={eventName} />

        <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <section className="grid grid-cols-1 gap-10 xl:grid-cols-12 xl:gap-12">
            <div className="xl:col-span-7">
              <div className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Overview</div>

              <h1 className="text-3xl font-serif leading-tight tracking-[-0.04em] text-slate-900 md:text-4xl lg:text-5xl">
                A detailed look at the summit
              </h1>

              <div
                className="mt-8 text-base leading-relaxed text-slate-700 md:text-xl [&_p]:mb-4 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <div className="mt-10">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900 md:text-2xl">
                  <span className="text-xl text-emerald-700">◌</span>
                  Background
                </h2>

                <div
                  className="mt-5 text-base leading-relaxed text-slate-700 md:text-lg [&_p]:mb-4 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: reasonToAttend }}
                />
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
                  <h3 className="mb-4 text-lg font-semibold text-slate-900 md:text-xl">Main objectives</h3>
                  <ul className="space-y-3">
                    {objectiveList.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-700 md:text-base">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span dangerouslySetInnerHTML={{ __html: objective }} />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
                  <h3 className="mb-4 text-lg font-semibold text-slate-900 md:text-xl">Who should attend</h3>
                  <div
                    className="text-sm leading-relaxed text-slate-700 md:text-base [&_p]:mb-3 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: eligibility }}
                  />
                </div>
              </div>
            </div>

            <aside className="xl:col-span-5">
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.06)] md:p-8">
                <h2 className="text-xl font-semibold text-slate-900">At a glance</h2>

                <dl className="mt-6 space-y-5 text-slate-700">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Date</dt>
                    <dd className="mt-2 text-base font-medium text-slate-900">{formattedDate}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Time</dt>
                    <dd className="mt-2 text-base font-medium text-slate-900">{eventStat?.time || "09:00 AM – 05:30 PM"}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Organizer</dt>
                    <dd className="mt-2 text-base font-medium text-slate-900">{eventStat?.organizer ?? "—"}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Venue</dt>
                    <dd
                      className="mt-2 text-base font-medium text-slate-900 [&_p]:m-0 [&_p]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                      dangerouslySetInnerHTML={{ __html: formattedVenue }}
                    />
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Address</dt>
                    <dd
                      className="mt-2 text-base font-medium text-slate-900 [&_p]:m-0 [&_p]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                      dangerouslySetInnerHTML={{ __html: formattedAddress }}
                    />
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Registration Deadline</dt>
                    <dd className="mt-2 text-base font-medium text-slate-900">{formattedDeadline}</dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Organiser</dt>
                    <dd className="mt-2 text-base font-medium text-slate-900">Secretariat, National Innovation & Digital Governance Summit</dd>
                  </div>
                </dl>

                <Link
                  href="/user_register"
                  type="button"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </section>

          <section className="mt-20">
            <div className="mb-8 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Partners</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Delivered in partnership</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <div key={category.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{category.title}</h3>

                  <ul className="space-y-4">
                    {category.items.map((partner) => {
                      const logoUrl = getPublicAssetUrl(partner.logo);

                      return (
                        <li key={partner.id} className="flex items-center gap-3 text-base text-slate-800">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={partner.name}
                              className="h-12 w-12 rounded-lg border border-emerald-100 bg-white object-contain p-1.5"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-sm font-semibold text-emerald-700">
                              {partner.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span>{partner.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer
          eventName={eventName}
          description={description}
          email={location?.email || "secretariat@digitalsummit.gov.bd"}
        />
      </div>
    </>
  );
}

