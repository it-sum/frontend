"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, BookOpen, Info } from "lucide-react";
import { Link } from "@/src/i18n/navigation";

const Recent = () => {
  const t = useTranslations("Recent");
  const isArabic = useLocale() === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="resource-status-title"
      className="bg-white py-14 dark:bg-[#020812] sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/8 dark:bg-[#071421] sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
              <BookOpen aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <Info aria-hidden="true" className="size-3.5" />
                {t("eyebrow")}
              </p>
              <h2
                id="resource-status-title"
                className="mt-1 text-lg font-semibold text-slate-950 dark:text-white sm:text-xl"
              >
                {t("title")}
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <Link
            href="/resources"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-cyan-500 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:border-white/12 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            {t("viewAll")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Recent;
