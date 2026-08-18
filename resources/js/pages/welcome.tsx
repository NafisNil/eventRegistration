import { Head } from "@inertiajs/react";
import { Header } from "../components/Frontend/Header";
import { Footer } from "../components/Frontend/Footer";
import { Hero } from "../components/Frontend/Hero";
import { QuickStats } from "../components/Frontend/QuickStats";
import { AboutSection } from "../components/Frontend/AboutSection";
import { FeaturedSpeakers } from "../components/Frontend/FeaturedSpeakers";
import { HighlightsSection } from "../components/Frontend/HighlightsSection";
import { ScheduleSection } from "../components/Frontend/ScheduleSection";
import { OrganizersSection } from "../components/Frontend/OrganizersSection";
import { CTASection } from "../components/Frontend/CTASection";

interface HeroRecord {
  description?: string | null;
  logo?: string | null;
}

interface EventStatRecord {
  event_name?: string | null;
  location?: string | null;
  event_date?: string | null;
  time?: string | null;
  registration_deadline?: string | null;
  target_participants?: string | null;
}

interface AboutRecord {
  description?: string | null;
  reason_to_attend?: string | null;
  objectives?: string | null;
  eligibility?: string | null;
}

interface GuestRecord {
  id: number;
  name: string;
  designation: string;
  description?: string | null;
  logo?: string | null;
  expertise?: string | null;
}

interface ScheduleRecord {
  id: number;
  time?: string | null;
  badge?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  keynote_speaker?: string | null;
}

interface ProgramHighlightRecord {
  id: number;
  title: string;
  description?: string | null;
  logo?: string | null;
}

interface PartnerRecord {
  id: number;
  name: string;
  logo?: string | null;
  partnership_category?: {
    name?: string | null;
  } | null;
}

interface LocationRecord {
  id?: number;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  map?: string | null;
}

interface WelcomeProps {
  hero?: HeroRecord | null;
  eventStat?: EventStatRecord | null;
  about?: AboutRecord | null;
  guests?: GuestRecord[];
  programHighlights?: ProgramHighlightRecord[];
  schedules?: ScheduleRecord[];
  partners?: PartnerRecord[];
  location?: LocationRecord | null;
}

export default function Welcome({ hero, eventStat, about, guests = [], programHighlights = [], schedules = [], partners = [], location }: WelcomeProps) {
  const eventName = eventStat?.event_name || "National Innovation & Digital Governance Summit 2026";
  const eventLocation = eventStat?.location || "Grand National Convention Centre";
  const eventDate = eventStat?.event_date || "2026-11-14";
  const eventTime = eventStat?.time || "09:00 AM – 05:30 PM";
  const registrationDeadline = eventStat?.registration_deadline || "2026-11-01";

  const formattedDate = new Date(eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Head title={eventName} />

      <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        <Header eventName={eventName} />
        <main>
          <Hero
            eventName={eventName}
            eventDate={formattedDate}
            location={eventLocation}
            description={hero?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure."}
            logo={hero?.logo || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"}
          />
          <QuickStats
            eventDate={formattedDate}
            eventTime={eventTime}
            location={eventLocation}
            registrationDeadline={new Date(registrationDeadline).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
          <AboutSection
            description={about?.description || "The National Innovation & Digital Governance Summit 2026 is an official convening designed to accelerate the adoption of responsible digital technology across public institutions."}
            reasonToAttend={about?.reason_to_attend || "Public institutions are digitising rapidly, but progress remains uneven across sectors and regions. This summit was established to create a shared national forum where practitioners can exchange evidence, align on standards and build lasting partnerships."}
            objectives={about?.objectives || "Advance a shared national roadmap for digital public infrastructure\nShowcase proven innovations from government, academia and industry\nStrengthen capacity in data governance, privacy and cyber-resilience\nBuild durable cross-sector partnerships and collaboration channels"}
            eligibility={about?.eligibility || "This forum is designed for public leaders, policy professionals, digital service teams, researchers, technologists and civil society actors working in the governance and public innovation space."}
          />
          <FeaturedSpeakers guests={guests} />
          <HighlightsSection highlights={programHighlights} />
          <ScheduleSection schedules={schedules} />
          <OrganizersSection partners={partners} />
          <CTASection />
        </main>
        <Footer
          eventName={eventName}
          description={about?.description || "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure."}
          email={location?.email || "secretariat@digitalsummit.gov.bd"}
        />
      </div>
    </>
  );
}