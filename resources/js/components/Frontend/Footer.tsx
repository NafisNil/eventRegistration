import React from "react";
import { Link } from "@inertiajs/react";
import { Facebook, Mail } from "lucide-react";

interface SocialMediaRecord {
  facebook?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  twitter?: string | null;
}

interface FooterProps {
  eventName?: string;
  description?: string | null;
  email?: string | null;
  socialMedia?: SocialMediaRecord | null;
}

const truncateFootDescription = (value?: string | null, maxLength = 200) => {
  if (!value) return "";

  const plainText = value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trim()}...`;
};

export const Footer: React.FC<FooterProps> = ({
  eventName = "National Innovation & Digital Governance Summit 2026",
  description = "A one-day national summit bringing together policymakers, technologists, academics and civil society to shape the next decade of digital public infrastructure.",
  email = "secretariat@digitalsummit.gov.bd",
  socialMedia,
}) => {
  const safeDescription = truncateFootDescription(description, 200);
  const facebookUrl = socialMedia?.facebook?.trim();

  return (
    <footer className="border-t border-emerald-100 bg-[#f5f9f3] text-sm text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-slate-800">{eventName}</span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-slate-600">{safeDescription}</p>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Quick links</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about_us" className="transition-colors hover:text-emerald-600">About the programme</Link></li>
              <li><Link href="/guests_list" className="transition-colors hover:text-emerald-600">Guests & speakers</Link></li>
              <li><Link href="/schedule_list" className="transition-colors hover:text-emerald-600">Event schedule</Link></li>
              <li><Link href="/user_register" className="transition-colors hover:text-emerald-600">Registration</Link></li>
              <li><Link href="/announcements_list" className="transition-colors hover:text-emerald-600">Announcements</Link></li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800">Contact</h3>
            <p className="flex items-center gap-2 text-xs text-slate-600">
              <Mail className="h-4 w-4 text-emerald-600" /> {email}
            </p>

            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 Organising Secretariat. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-emerald-600">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-emerald-600">Terms & Conditions</Link>
            <Link href="/admin" className="transition-colors hover:text-emerald-600">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};