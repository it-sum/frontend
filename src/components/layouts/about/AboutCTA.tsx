"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Rocket,
  ShieldCheck,
  Sparkles,
  Ticket,
  type LucideIcon,
} from "lucide-react";

const features: { icon: LucideIcon; textKey: string; color: string }[] = [
  { icon: Ticket, textKey: "freeForever", color: "text-blue-500" },
  { icon: ShieldCheck, textKey: "noCard", color: "text-cyan-400" },
  { icon: Sparkles, textKey: "startQuickly", color: "text-sky-500" },
];

const AboutCTA = () => {
  const t = useTranslations("AboutCTA");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const arrowClass = `transition-transform duration-300 ${
    isArabic
      ? "rotate-180 group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`;

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {}
        <div className="relative overflow-hidden rounded-[22px] border border-blue-500/20 bg-linear-to-br from-blue-500/6 via-white to-blue-500/3 p-8 shadow-2xl shadow-blue-950/10 dark:from-[#06172a] dark:via-[#061321] dark:to-[#05203b] dark:border-blue-500/20 dark:shadow-black/30 sm:p-10 lg:p-12">
          {}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px] dark:bg-cyan-500/10" />

          {}
          <DotPattern
            color="#008cff"
            className="top-0 right-0"
            maskDirection="to bottom left"
          />
          <DotPattern
            color="#00d98b"
            className="bottom-0 left-0"
            maskDirection="to top right"
          />

          <div className="relative z-10 flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-start">
            {}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {}
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 sm:flex">
                <Rocket size={28} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                  {t("title")} <br />
                  <span className="bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    {t("titleHighlight")}
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400 sm:text-base">
                  {t("description")}
                </p>
              </div>
            </div>

            {}
            <div className="flex w-full flex-col items-center gap-6 lg:w-auto lg:items-end">
              {}
              <Link
                href="/get-started"
                className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 px-8 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,174,214,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(8,174,214,0.3)] md:w-auto md:text-base"
              >
                {t("button")}
                <ArrowRight className={`h-5 w-5 ${arrowClass}`} />
              </Link>

              {}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-end">
                {features.map((feature) => (
                  <div
                    key={feature.textKey}
                    className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    <span>{t(`features.${feature.textKey}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;

function DotPattern({
  color,
  className,
  maskDirection,
}: {
  color: string;
  className: string;
  maskDirection: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute h-24 w-28 opacity-35 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "10px 10px",
        maskImage: `linear-gradient(${maskDirection}, black 0%, transparent 75%)`,
        WebkitMaskImage: `linear-gradient(${maskDirection}, black 0%, transparent 75%)`,
      }}
    />
  );
}
