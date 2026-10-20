"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Building2,
  LayoutDashboard,
  LogOut,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import { APP_ROUTES, isArabicLocale } from "@/src/constants/variables";

const Preview = () => {
  const t = useTranslations("Preview");
  const isArabic = isArabicLocale(useLocale());

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      aria-labelledby="student-dashboard-preview-title"
      className="relative overflow-hidden bg-slate-50 py-16 dark:bg-public-background sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,.08),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,.08),transparent_45%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:px-10">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-cyan-500"
            />
            {t("eyebrow")}
          </p>
          <h2
            id="student-dashboard-preview-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {t("description")}
          </p>
          <Link
            href={APP_ROUTES.LOGIN}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            {t("cta")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <figure className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-public-surface dark:shadow-black/20">
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 text-xs dark:border-white/8 sm:px-5">
            <span className="inline-flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
              <LayoutDashboard
                aria-hidden="true"
                className="size-4 text-cyan-600 dark:text-cyan-300"
              />
              {t("dashboard.title")}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-300">
              {t("demoLabel")}
            </span>
          </figcaption>

          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/8 dark:bg-white/2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <UserRound aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t("dashboard.profileLabel")}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {t("dashboard.welcome")}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {t("dashboard.profileDetails")}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("dashboard.quickAccess")}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <LogOut aria-hidden="true" className="size-3.5" />
                {t("dashboard.signOut")}
              </span>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <PreviewLink icon={BookOpen} title={t("dashboard.resources")} />
              <PreviewLink
                icon={Building2}
                title={t("dashboard.departments")}
              />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};

function PreviewLink({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-white/8">
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0 text-cyan-600 dark:text-cyan-300"
      />
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {title}
      </span>
    </div>
  );
}

export default Preview;
