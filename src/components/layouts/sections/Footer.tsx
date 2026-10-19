"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Code2,
  Compass,
  LockKeyhole,
  Mail,
  Users,
  LayoutGrid,
} from "lucide-react";
import Logo from "@/src/assets/images/logo.webp";

type FooterLink = { label: string; href: string };
type FooterColumn = {
  key: "platform" | "explore" | "company";
  icon: React.ElementType;
  iconClass: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    key: "platform",
    icon: LayoutGrid,
    iconClass: "text-sky-400",
    links: [
      { label: "dashboard", href: "/dashboard" },
      { label: "login", href: "/login" },
    ],
  },
  {
    key: "explore",
    icon: BookOpen,
    iconClass: "text-emerald-400",
    links: [
      { label: "departments", href: "/departments" },
      { label: "resources", href: "/resources" },
    ],
  },
  {
    key: "company",
    icon: Users,
    iconClass: "text-purple-400",
    links: [
      { label: "about", href: "/about" },
      { label: "contact", href: "/contact" },
    ],
  },
];

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const arrowClass =
    "transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1";

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden border-t border-slate-200 bg-white/30 px-4 pb-6 pt-8 shadow-[0_-20px_70px_rgba(15,23,42,0.04)] backdrop-blur-md sm:px-6 lg:px-8 dark:border-[#1b3046] dark:bg-[#05111e]/60 dark:shadow-[0_-25px_90px_rgba(0,0,0,0.14)]"
    >
      {/* AMBIENT BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -bottom-32 left-[10%] h-72 w-96 rounded-full bg-sky-500/2.5 blur-[120px] dark:bg-sky-500/3.5" />
        <div className="absolute -right-40 top-10 h-72 w-96 rounded-full bg-cyan-400/2 blur-[120px] dark:bg-cyan-400/2.5" />
      </div>

      {/* GRID CONTAINER - Full Width */}
      <div className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
        {/* BRAND SECTION */}
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <Image
                src={Logo}
                alt="IT-SUM"
                width={36}
                height={36}
                className="h-9 w-9 drop-shadow-[0_0_8px_rgba(34,211,238,.5)]"
                priority
              />
            </div>
            <span className="text-xl font-bold italic tracking-tight text-slate-950 dark:text-white">
              IT-SUM
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-[#9ba8b9]">
            {t("brand.description")}
          </p>

          <div className="mt-5 space-y-3">
            <BrandFeature
              icon={BookOpen}
              iconClass="text-sky-400"
              bgClass="bg-sky-400/7"
              borderClass="border-sky-400/15"
              title={t("brand.features.resources.title")}
              description={t("brand.features.resources.description")}
            />
            <BrandFeature
              icon={Compass}
              iconClass="text-emerald-400"
              bgClass="bg-emerald-400/7"
              borderClass="border-emerald-400/15"
              title={t("brand.features.departments.title")}
              description={t("brand.features.departments.description")}
            />
          </div>

          <div className="mt-5">
            <a
              href="mailto:support@it-sum.com"
              aria-label={
                isArabic ? "راسل الدعم عبر البريد الإلكتروني" : "Email support"
              }
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/30 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-sky-400/40 hover:text-sky-600 dark:border-[#25394e] dark:bg-[#081421]/40 dark:text-slate-200 dark:hover:text-sky-300"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              support@it-sum.com
            </a>
          </div>
        </div>

        {/* FOOTER LINKS COLUMNS */}
        {footerColumns.map((column) => {
          const Icon = column.icon;
          return (
            <div key={column.key} className="xl:px-2">
              <div className="flex items-center gap-2">
                <Icon
                  className={`h-5 w-5 ${column.iconClass}`}
                  strokeWidth={1.8}
                />
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                  {t(`columns.${column.key}.title`)}
                </h3>
              </div>
              <nav className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={`/${locale}${link.href}`}
                    className="group flex items-center justify-between gap-2 text-xs text-slate-500 transition-colors hover:text-sky-500 dark:text-[#9aa7b9] dark:hover:text-sky-300"
                  >
                    <span>
                      {t(`columns.${column.key}.links.${link.label}`)}
                    </span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 ${arrowClass}`}
                    />
                  </Link>
                ))}
              </nav>
            </div>
          );
        })}

        {/* NEWSLETTER SECTION */}
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1 rounded-2xl border border-slate-200 bg-white/40 px-5 py-6 text-center backdrop-blur-md dark:border-[#284058] dark:bg-[#081523]/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/15 bg-sky-400/5.5">
            <Mail className="h-5 w-5 text-sky-400" strokeWidth={1.7} />
          </div>
          <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("newsletter.title")}
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-[#9aa7b9]">
            {t("newsletter.description")}
          </p>

          <div className="mt-5">
            <a
              href="mailto:support@it-sum.com?subject=Newsletter%20updates%20request"
              className="group mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 px-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(14,165,233,.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_35px_rgba(14,165,233,.28)]"
            >
              {t("newsletter.contact")}
              <ArrowRight
                aria-hidden="true"
                className={`h-4 w-4 ${arrowClass}`}
              />
            </a>
          </div>

          <div className="mt-5 flex items-start justify-center gap-2 text-start text-[10px] leading-relaxed text-slate-500 dark:text-[#9aa7b9]">
            <LockKeyhole className="mt-0.5 h-3 w-3 shrink-0" />
            <p>{t("newsletter.privacy")}</p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative z-10 mx-auto mt-6 flex max-w-screen-2xl flex-col items-center justify-center gap-2 border-t border-slate-200 py-4 text-center text-[10px] text-slate-500 dark:border-white/8 dark:text-[#8997aa] md:flex-row">
        <span>
          © {new Date().getFullYear()} IT-SUM. {t("copyright")}
        </span>
        <span className="hidden h-3 w-px bg-slate-300 dark:bg-white/15 md:block" />
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Code2 className="h-3 w-3 text-sky-400" />
          <span>{t("credit.addBy")}</span>
          <span className="font-semibold text-cyan-500 dark:text-cyan-300">
            TheSeifDev
          </span>
          <span>{t("credit.and")}</span>
          <span className="font-semibold text-emerald-500">ALF</span>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================
   COMPONENTS
========================================================= */

function BrandFeature({
  icon: Icon,
  title,
  description,
  iconClass,
  bgClass,
  borderClass,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconClass: string;
  bgClass: string;
  borderClass: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${bgClass} ${borderClass}`}
      >
        <Icon className={`h-4.5 w-4.5 ${iconClass}`} strokeWidth={1.7} />
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-950 dark:text-white">
          {title}
        </h4>
        <p className="mt-0.5 text-[10px] text-slate-500 dark:text-[#8996a8]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Footer;
