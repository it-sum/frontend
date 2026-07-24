"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  CircleHelp,
  FileText,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type StatTone = "cyan" | "emerald" | "violet" | "blue" | "amber";
type StatItem = {
  icon: LucideIcon;
  value: string;
  labelKey: string;
  tone: StatTone;
};

const statsData: StatItem[] = [
  {
    icon: UsersRound,
    value: "5,000+",
    labelKey: "Stats.activeStudents",
    tone: "cyan",
  },
  {
    icon: BookOpen,
    value: "1,250+",
    labelKey: "Stats.pdfSummaries",
    tone: "emerald",
  },
  {
    icon: FileText,
    value: "3,400+",
    labelKey: "Stats.videoLessons",
    tone: "violet",
  },
  {
    icon: CircleHelp,
    value: "8,200+",
    labelKey: "Stats.quizQuestions",
    tone: "blue",
  },
  {
    icon: Trophy,
    value: "98.5%",
    labelKey: "Stats.satisfactionRate",
    tone: "amber",
  },
];

const toneStyles: Record<StatTone, { icon: string; glow: string }> = {
  cyan: {
    icon: "text-cyan-500 dark:text-[#00d9e8]",
    glow: "bg-cyan-500/10 dark:bg-[#00d9e8]/10",
  },
  emerald: {
    icon: "text-emerald-500 dark:text-[#00dba6]",
    glow: "bg-emerald-500/10 dark:bg-[#00dba6]/10",
  },
  violet: {
    icon: "text-violet-500 dark:text-[#a34cff]",
    glow: "bg-violet-500/10 dark:bg-[#a34cff]/10",
  },
  blue: {
    icon: "text-blue-500 dark:text-[#009cff]",
    glow: "bg-blue-500/10 dark:bg-[#009cff]/10",
  },
  amber: {
    icon: "text-amber-500 dark:text-[#ffd000]",
    glow: "bg-amber-500/10 dark:bg-[#ffd000]/10",
  },
};

const StatCard = ({
  item,
  label,
  index,
}: {
  item: StatItem;
  label: string;
  index: number;
}) => {
  const Icon = item.icon;
  const styles = toneStyles[item.tone];

  return (
    <div
      className={`group relative flex min-h-32 items-center justify-center px-4 py-4 transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-white/3 ${index !== 0 ? "border-t border-slate-200/70 sm:border-t-0 sm:border-s lg:border-slate-200/70 dark:border-white/6 lg:dark:border-white/6" : ""}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-3 left-1/2 size-20 -translate-x-1/2 rounded-full blur-[35px] opacity-50 transition-opacity duration-300 group-hover:opacity-100 ${styles.glow}`}
      />
      <div className="relative flex flex-col items-center text-center">
        <Icon
          className={`mb-2 size-7 transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
          strokeWidth={1.9}
        />
        <div className="text-[23px] font-medium leading-none tracking-[-0.035em] text-slate-900 dark:text-[#f3f6fa]">
          {item.value}
        </div>
        <div className="mt-2 text-[10px] font-medium leading-none text-slate-500 dark:text-[#9aa8b8]">
          {label}
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const t = useTranslations();

  return (
    <section id="stats" className="relative overflow-hidden py-4">
      <div className="relative mx-auto w-full max-w-7xl px-7 sm:px-8 lg:px-10 xl:px-14">
        <div className="relative overflow-hidden rounded-xl border-x border-b border-slate-200/70 dark:border-white/6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-24 h-40 w-3/4 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[70px] "
          />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {statsData.map((item, index) => (
              <StatCard
                key={item.labelKey}
                item={item}
                label={t(item.labelKey)}
                index={index}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent dark:via-[#00aaff]/90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-2/3 -translate-x-1/2 bg-cyan-400/10 blur-xl dark:bg-[#009cff]/20"
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
