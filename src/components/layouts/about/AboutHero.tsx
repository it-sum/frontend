"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  Users,
  Award,
  LayoutDashboard,
  ChartNoAxesColumnIncreasing,
  FileText,
  PlaySquare,
  CircleHelp,
  Bookmark,
  Trophy,
  Search,
  Bell,
  type LucideIcon,
} from "lucide-react";

// =========================================================
// STATIC DATA (Extracted for cleaner JSX)
// =========================================================

const featureCards = [
  {
    icon: GraduationCap,
    titleKey: "features.quality.title",
    descKey: "features.quality.desc",
    color: "blue",
  },
  {
    icon: Users,
    titleKey: "features.student.title",
    descKey: "features.student.desc",
    color: "emerald",
  },
  {
    icon: Award,
    titleKey: "features.improving.title",
    descKey: "features.improving.desc",
    color: "amber",
  },
];

const featureStyles: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-500",
};

const navItems: { icon: LucideIcon; labelKey: string; active?: boolean }[] = [
  { icon: LayoutDashboard, labelKey: "dashboard.nav.overview", active: true },
  { icon: ChartNoAxesColumnIncreasing, labelKey: "dashboard.nav.progress" },
  { icon: FileText, labelKey: "dashboard.nav.summaries" },
  { icon: PlaySquare, labelKey: "dashboard.nav.videos" },
  { icon: CircleHelp, labelKey: "dashboard.nav.quizzes" },
  { icon: Bookmark, labelKey: "dashboard.nav.bookmarks" },
  { icon: Trophy, labelKey: "dashboard.nav.achievements" },
];

const activityItems = [
  {
    icon: "📄",
    titleKey: "dashboard.activity.item1.title",
    subtitleKey: "dashboard.activity.item1.subtitle",
    timeKey: "dashboard.activity.item1.time",
  },
  {
    icon: "🛡️",
    titleKey: "dashboard.activity.item2.title",
    subtitleKey: "dashboard.activity.item2.subtitle",
    timeKey: "dashboard.activity.item2.time",
  },
  {
    icon: "▶",
    titleKey: "dashboard.activity.item3.title",
    subtitleKey: "dashboard.activity.item3.subtitle",
    timeKey: "dashboard.activity.item3.time",
  },
];

const achievementItems = [
  {
    icon: "◆",
    titleKey: "dashboard.achievements.item1.title",
    descKey: "dashboard.achievements.item1.desc",
  },
  {
    icon: "★",
    titleKey: "dashboard.achievements.item2.title",
    descKey: "dashboard.achievements.item2.desc",
  },
  {
    icon: "⬡",
    titleKey: "dashboard.achievements.item3.title",
    descKey: "dashboard.achievements.item3.desc",
  },
];

// =========================================================
// MAIN COMPONENT
// =========================================================

const AboutHero = () => {
  const t = useTranslations("AboutHero");

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 mt-4">
      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute left-[43%] top-[48%] hidden h-24 w-24 opacity-30 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, #008cff 1.2px, transparent 1.2px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-8">
        {/* ================= LEFT ================= */}
        <div className="flex flex-col">
          {/* Badge */}
          <div className="mb-4 flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/15 bg-sky-500/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-sky-500">
                {t("badge")}
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-[38px] font-bold leading-[1.12] tracking-[-0.035em] sm:text-[44px] lg:text-[48px]">
            {t("titleStart")}
            <br />
            {t("titleMiddle")}{" "}
            <span className="bg-linear-to-r from-[#008cff] to-[#00d982] bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-142.5 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            {t("description1")}
            <br className="hidden sm:block" />
            {t("description2")}
          </p>

          {/* Feature Card */}
          <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 sm:grid-cols-3 dark:border-white/7 dark:bg-[#07111e]/80">
            {featureCards.map((card, index) => (
              <div key={card.titleKey} className="relative p-5">
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${featureStyles[card.color]}`}
                >
                  <card.icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="text-sm font-semibold">{t(card.titleKey)}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t(card.descKey)}
                </p>
                {/* Divider logic */}
                {index < featureCards.length - 1 && (
                  <div className="absolute top-5 right-0 hidden h-[70%] w-px bg-slate-200 sm:block dark:bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT / DASHBOARD ================= */}
        <div className="relative">
          <p className="mb-2 inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] text-slate-600 dark:border-white/10 dark:bg-[#081522] dark:text-slate-300">
            {t("dashboard.demoLabel")}
          </p>
          <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-50 shadow-2xl shadow-blue-950/10 dark:border-[#17304a] dark:bg-[#04101d] dark:shadow-black/30">
            <div className="grid min-h-102.5 grid-cols-[112px_1fr] sm:grid-cols-[135px_1fr]">
              {/* Sidebar */}
              <aside className="border-r border-slate-200 p-4 dark:border-white/7">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-lg font-black italic text-cyan-500">
                    IT
                  </div>
                  <span className="text-[10px] font-bold">IT-SUM</span>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => (
                    <DashboardNavItem
                      key={item.labelKey}
                      icon={<item.icon size={13} />}
                      label={t(item.labelKey)}
                      active={item.active}
                    />
                  ))}
                </nav>
              </aside>

              {/* Dashboard Content */}
              <div className="min-w-0 p-4 sm:p-5">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {t("dashboard.title")}
                    </p>
                    <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400">
                      {t("dashboard.welcome")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden h-8 w-32 items-center gap-2 rounded-lg border border-slate-200 px-3 sm:flex dark:border-white/7">
                      <Search size={11} className="text-slate-400" />
                      <span className="text-[8px] text-slate-400">
                        {t("dashboard.search")}
                      </span>
                    </div>
                    <Bell
                      size={14}
                      className="text-slate-500 dark:text-slate-300"
                    />
                    {/* Fixed Tailwind v4 classes */}
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-emerald-400 to-cyan-500" />
                  </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {/* Progress */}
                  <DashboardCard title={t("dashboard.stats.progress.title")}>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[conic-gradient(#00c98d_0_75%,#0d2031_75%_100%)]">
                        {/* Fixed Tailwind v4 classes */}
                        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-white text-[10px] font-bold dark:bg-[#081522]">
                          75%
                        </div>
                      </div>
                      <span className="text-[8px] text-slate-400">
                        {t("dashboard.stats.progress.desc")}
                      </span>
                    </div>
                  </DashboardCard>

                  {/* Quizzes */}
                  <DashboardCard title={t("dashboard.stats.quizzes.title")}>
                    <p className="text-xl font-semibold">24</p>
                    <p className="mt-2 text-[8px] font-medium text-emerald-500">
                      {t("dashboard.stats.quizzes.desc")}
                    </p>
                  </DashboardCard>

                  {/* Hours */}
                  <DashboardCard title={t("dashboard.stats.hours.title")}>
                    <p className="text-xl font-semibold">68h</p>
                    <p className="mt-2 text-[8px] font-medium text-emerald-500">
                      {t("dashboard.stats.hours.desc")}
                    </p>
                  </DashboardCard>
                </div>

                {/* Bottom */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                  {/* Recent Activity */}
                  <DashboardCard title={t("dashboard.activity.title")}>
                    {activityItems.map((item) => (
                      <ActivityItem
                        key={item.titleKey}
                        icon={item.icon}
                        title={t(item.titleKey)}
                        subtitle={t(item.subtitleKey)}
                        time={t(item.timeKey)}
                      />
                    ))}
                  </DashboardCard>

                  {/* Achievements */}
                  <DashboardCard title={t("dashboard.achievements.title")}>
                    {achievementItems.map((item) => (
                      <Achievement
                        key={item.titleKey}
                        icon={item.icon}
                        title={t(item.titleKey)}
                        description={t(item.descKey)}
                      />
                    ))}
                  </DashboardCard>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom glow */}
          {/* Fixed Tailwind v4 classes */}
          <div className="pointer-events-none absolute right-[10%] -bottom-7.5 left-[10%] h-16 bg-cyan-500/10 blur-[70px]" />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

/* =========================
   Small Dashboard Components
========================= */

function DashboardNavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[9px] ${
        active
          ? "bg-sky-500/10 font-medium text-sky-500"
          : "text-slate-500 dark:text-slate-300"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    // Fixed Tailwind v4 classes
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-white/5 dark:bg-[#081522]">
      <p className="mb-3 text-[9px] font-semibold">{title}</p>
      {children}
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  subtitle,
  time,
}: {
  icon: string;
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    // Fixed Tailwind v4 classes
    <div className="flex items-center gap-2 border-b border-slate-100 py-2 last:border-0 dark:border-white/4">
      {/* Fixed Tailwind v4 classes */}
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[9px] dark:bg-white/6">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[8px] font-medium">{title}</p>
        <p className="mt-0.5 text-[7px] text-slate-400">{subtitle}</p>
      </div>
      <span className="shrink-0 text-[7px] text-slate-400">{time}</span>
    </div>
  );
}

function Achievement({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-[10px] text-sky-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[8px] font-medium">{title}</p>
        <p className="mt-0.5 truncate text-[7px] text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
