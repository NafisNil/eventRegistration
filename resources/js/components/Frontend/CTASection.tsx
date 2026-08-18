import React from "react";
import { Link } from "@inertiajs/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";


export const CTASection: React.FC = () => {
  return (
    <section className="relative border-t border-emerald-100 bg-emerald-50 py-20 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Reserve your seat</span>
        <h2 className="mt-2 mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Seats are limited and allocated on a first-come, confirmed basis
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-slate-600">
          Registration closes on 1 November 2026. Complete the form in under three minutes and receive your registration ID instantly.
        </p>
        <Link
          href="/user_register"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-500"
        >
          Register Now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};