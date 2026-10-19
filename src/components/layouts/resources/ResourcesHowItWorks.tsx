"use client";

import { ArrowRight, Building2, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";

const ResourcesHowItWorks = () => {
  const t = useTranslations("resources.howItWorks");
  const isArabic = useLocale() === "ar";

  return (
    <section className="w-full bg-transparent px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/8 dark:bg-[#071421] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
            {t("statusLabel")}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/departments"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-500 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-white/12 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            <Building2 aria-hidden="true" className="size-4" />
            {t("departments")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            <Mail aria-hidden="true" className="size-4" />
            {t("contact")}
            <ArrowRight
              aria-hidden="true"
              className={`size-4 ${isArabic ? "rotate-180" : ""}`}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHowItWorks;
