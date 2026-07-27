"use client";

import Image from "next/image";
import { BarChart3, BookOpen, ShieldCheck } from "lucide-react";
import Logo from "@/src/assets/images/logo.webp";
import { useTranslations } from "next-intl";

type Feature = {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  iconColor: string;
};

const features: Feature[] = [
  {
    icon: BookOpen,
    titleKey: "features.study.title",
    descriptionKey: "features.study.description",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    icon: BarChart3,
    titleKey: "features.track.title",
    descriptionKey: "features.track.description",
    iconColor: "text-cyan-500 dark:text-cyan-400",
  },
  {
    icon: ShieldCheck,
    titleKey: "features.secure.title",
    descriptionKey: "features.secure.description",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
];

const LoginLeft = () => {
  const t = useTranslations("Auth.Left");

  return (
    <section className="relative hidden w-1/2 flex-col overflow-hidden border-e border-slate-200 bg-white p-12 lg:flex xl:p-16 dark:border-white/5 dark:bg-[#020817]">
      {/* Background glows */}
      <div className="pointer-events-none absolute -inset-s-20 top-10 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/3" />
      <div className="pointer-events-none absolute bottom-0 inset-e-0 h-80 w-80 rounded-full bg-cyan-400/5 blur-[120px] dark:bg-cyan-400/2.5" />

      {/* Top dots */}
      <div
        className="pointer-events-none absolute inset-e-12 top-12 h-24 w-32 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,.5) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="IT-SUM Logo"
            priority
            className="h-12 w-12 object-contain"
          />
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              IT-SUM
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t("brandSubtitle")}
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="my-auto">
          {/* Welcome pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 dark:border-white/5 dark:bg-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,.9)] dark:bg-sky-400" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">
              {t("welcomePill")}
            </span>
          </div>

          <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-slate-900 xl:text-5xl dark:text-white">
            {t("heroTitlePrefix")}{" "}
            <span className="bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 xl:text-base dark:text-slate-400">
            {t("heroDescription")}
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {features.map(({ icon: Icon, titleKey, descriptionKey, iconColor }) => (
              <div key={titleKey} className="group flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 transition-colors duration-300 group-hover:bg-slate-200 dark:border-white/5 dark:bg-white/3 dark:group-hover:bg-white/6">
                  <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {t(descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Space */}
        <div className="pt-8 text-xs text-slate-400 dark:text-slate-500/50">
          {t("footerCopy", { year: new Date().getFullYear() })}
        </div>
      </div>
    </section>
  );
};

export default LoginLeft;