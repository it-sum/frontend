"use client";

import { ArrowRight, Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { APP_ROUTES, isArabicLocale } from "@/src/constants/variables";

const DepartmentsFeatured = () => {
  const t = useTranslations("DepartmentsFeatured");
  const isArabic = isArabicLocale(useLocale());

  return (
    <section className="px-5 pb-14 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/8 dark:bg-public-surface sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
            <Info aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              {t("eyebrow")}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">
              {t("title")}
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("description")}
            </p>
          </div>
        </div>

        <Link
          href={APP_ROUTES.CONTACT}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          {t("button")}
          <ArrowRight
            aria-hidden="true"
            className={`size-4 ${isArabic ? "rotate-180" : ""}`}
          />
        </Link>
      </div>
    </section>
  );
};

export default DepartmentsFeatured;
