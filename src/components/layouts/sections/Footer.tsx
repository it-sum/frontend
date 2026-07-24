"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Camera,
  ChevronRight,
  Code2,
  Globe2,
  Headphones,
  LockKeyhole,
  Mail,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  LayoutGrid,
} from "lucide-react";
import Logo from "@/src/assets/images/logo.webp";

type FooterLink = { label: string; href: string };
type FooterColumn = {
  key: "platform" | "resources" | "company" | "legal";
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
      { label: "courses", href: "/courses" },
      { label: "summaries", href: "/summaries" },
      { label: "videos", href: "/videos" },
      { label: "quizzes", href: "/quizzes" },
      { label: "progress", href: "/progress" },
      { label: "changelog", href: "/changelog" },
    ],
  },
  {
    key: "resources",
    icon: BookOpen,
    iconClass: "text-emerald-400",
    links: [
      { label: "blog", href: "/blog" },
      { label: "guides", href: "/guides" },
      { label: "helpCenter", href: "/help" },
      { label: "community", href: "/community" },
      { label: "updates", href: "/updates" },
      { label: "roadmap", href: "/roadmap" },
      { label: "apiDocs", href: "/docs" },
    ],
  },
  {
    key: "company",
    icon: Users,
    iconClass: "text-purple-400",
    links: [
      { label: "about", href: "/about" },
      { label: "careers", href: "/careers" },
      { label: "contact", href: "/contact" },
      { label: "partners", href: "/partners" },
      { label: "pressKit", href: "/press-kit" },
    ],
  },
  {
    key: "legal",
    icon: ShieldCheck,
    iconClass: "text-amber-400",
    links: [
      { label: "terms", href: "/terms" },
      { label: "privacy", href: "/privacy" },
      { label: "cookies", href: "/cookies" },
      { label: "refund", href: "/refund-policy" },
    ],
  },
];

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const arrowClass =
    "transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1";

  const socials = [
    { icon: Code2, label: "GitHub" },
    { icon: Users, label: "Discord" },
    { icon: PlayCircle, label: "YouTube" },
    { icon: Camera, label: "Instagram" },
  ];

  const trustColors = [
    "bg-sky-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-amber-500",
  ];

  const trustItems = [
    {
      icon: ShieldCheck,
      iconClass: "text-sky-400",
      bgClass: "bg-sky-400/6",
      borderClass: "border-sky-400/10",
      title: "99.9%",
      description: t("trust.uptime"),
    },
    {
      icon: LockKeyhole,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-400/6",
      borderClass: "border-emerald-400/10",
      title: t("trust.secure.title"),
      description: t("trust.secure.description"),
    },
    {
      icon: Zap,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-400/6",
      borderClass: "border-amber-400/10",
      title: t("trust.fast.title"),
      description: t("trust.fast.description"),
    },
    {
      icon: Headphones,
      iconClass: "text-purple-400",
      bgClass: "bg-purple-400/6",
      borderClass: "border-purple-400/10",
      title: t("trust.support.title"),
      description: t("trust.support.description"),
    },
  ];

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
      <div className="relative z-10 mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-4">
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
              icon={Users}
              iconClass="text-emerald-400"
              bgClass="bg-emerald-400/7"
              borderClass="border-emerald-400/15"
              title={t("brand.features.community.title")}
              description={t("brand.features.community.description")}
            />
            <BrandFeature
              icon={TrendingUp}
              iconClass="text-purple-400"
              bgClass="bg-purple-400/7"
              borderClass="border-purple-400/15"
              title={t("brand.features.progress.title")}
              description={t("brand.features.progress.description")}
            />
            <BrandFeature
              icon={Sparkles}
              iconClass="text-amber-400"
              bgClass="bg-amber-400/7"
              borderClass="border-amber-400/15"
              title={t("brand.features.learning.title")}
              description={t("brand.features.learning.description")}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((social) => (
              <Social
                key={social.label}
                icon={social.icon}
                label={social.label}
              />
            ))}
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

          <form onSubmit={(event) => event.preventDefault()} className="mt-5">
            <input
              type="email"
              required
              placeholder={t("newsletter.placeholder")}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white/30 px-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/6 dark:border-[#31465b] dark:bg-[#0b1826]/55 dark:text-white dark:placeholder:text-[#8290a2]"
            />
            <button
              type="submit"
              className="group mt-3 flex h-11 w-full items-center justify-center gap-6 rounded-lg bg-linear-to-r from-blue-600 via-cyan-500 to-emerald-400 px-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(14,165,233,.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_35px_rgba(14,165,233,.28)]"
            >
              {t("newsletter.button")}
              <ArrowRight className={`h-4 w-4 ${arrowClass}`} />
            </button>
          </form>

          <div className="mt-5 flex items-start justify-center gap-2 text-start text-[10px] leading-relaxed text-slate-500 dark:text-[#9aa7b9]">
            <LockKeyhole className="mt-0.5 h-3 w-3 shrink-0" />
            <p>{t("newsletter.privacy")}</p>
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="relative z-10 mx-auto my-6 max-w-screen-2xl">
        <div className="mb-6 h-px bg-slate-200 dark:bg-white/8" />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-slate-200/60 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 dark:bg-white/7">
          {/* Trusted Students Item */}
          <div className="flex items-center gap-3 bg-transparent p-4 dark:bg-transparent">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/5.5">
              <Globe2 className="h-6 w-6 text-emerald-400" strokeWidth={1.7} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-[#8794a7]">
                {t("trust.trusted")}
              </p>
              <strong className="mt-0.5 block text-lg font-medium tracking-tight text-slate-950 dark:text-white">
                5,000+
              </strong>
              <p className="text-[10px] text-slate-500 dark:text-[#8794a7]">
                {t("trust.students")}
              </p>
            </div>
            <div className="ms-auto hidden items-center xl:flex">
              {trustColors.map((color, index) => (
                <div
                  key={index}
                  className={`-ms-2 flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] border-white dark:border-[#071421] ${color}`}
                >
                  <Users className="h-3.5 w-3.5 text-white" />
                </div>
              ))}
              <div className="-ms-2 flex h-8 w-8 items-center justify-center rounded-full border-[2.5px] border-white bg-slate-100 text-sm text-slate-600 dark:border-[#071421] dark:bg-[#152236] dark:text-slate-300">
                +
              </div>
            </div>
          </div>

          {/* Other Trust Items */}
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-transparent p-4 dark:bg-transparent"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${item.bgClass} ${item.borderClass}`}
                >
                  <Icon
                    className={`h-6 w-6 ${item.iconClass}`}
                    strokeWidth={1.7}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500 dark:text-[#8997a9]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
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

function Social({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/18 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-sky-400/5 hover:text-sky-500 dark:border-[#25394e] dark:bg-[#081421]/40 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
    >
      <Icon className="h-4 w-4" strokeWidth={1.8} />
    </button>
  );
}

export default Footer;
