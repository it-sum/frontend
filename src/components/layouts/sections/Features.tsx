"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  LineChart,
  Sparkles,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

type FeatureColor = "emerald" | "violet" | "amber" | "blue" | "teal" | "cyan";
type FeatureItem = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: FeatureColor;
};

const featuresData: FeatureItem[] = [
  {
    icon: BookOpen,
    titleKey: "Features.academicTitle",
    descKey: "Features.academicDescription",
    color: "emerald",
  },
  {
    icon: Brain,
    titleKey: "Features.quizTitle",
    descKey: "Features.quizDescription",
    color: "violet",
  },
  {
    icon: Video,
    titleKey: "Features.videoTitle",
    descKey: "Features.videoDescription",
    color: "amber",
  },
  {
    icon: LineChart,
    titleKey: "Features.progressTitle",
    descKey: "Features.progressDescription",
    color: "blue",
  },
  {
    icon: Sparkles,
    titleKey: "Features.aiTitle",
    descKey: "Features.aiDescription",
    color: "teal",
  },
  {
    icon: Users,
    titleKey: "Features.communityTitle",
    descKey: "Features.communityDescription",
    color: "cyan",
  },
];

const colorStyles: Record<
  FeatureColor,
  { icon: string; circle: string; glow: string }
> = {
  emerald: {
    icon: "text-emerald-500 dark:text-[#00e6b0]",
    circle:
      "border-emerald-500/30 bg-emerald-500/5 dark:border-[#00dba6]/35 dark:bg-[#00dba6]/5",
    glow: "bg-emerald-400/10 dark:bg-[#00e6b0]/12",
  },
  violet: {
    icon: "text-violet-500 dark:text-[#9b4dff]",
    circle:
      "border-violet-500/30 bg-violet-500/5 dark:border-[#8b45e8]/35 dark:bg-[#8b45e8]/5",
    glow: "bg-violet-400/10 dark:bg-[#8b45e8]/12",
  },
  amber: {
    icon: "text-amber-500 dark:text-[#ffd000]",
    circle:
      "border-amber-500/30 bg-amber-500/5 dark:border-[#d9ae00]/35 dark:bg-[#d9ae00]/5",
    glow: "bg-amber-400/10 dark:bg-[#ffd000]/10",
  },
  blue: {
    icon: "text-blue-500 dark:text-[#009cff]",
    circle:
      "border-blue-500/30 bg-blue-500/5 dark:border-[#008de5]/35 dark:bg-[#008de5]/5",
    glow: "bg-blue-400/10 dark:bg-[#009cff]/12",
  },
  teal: {
    icon: "text-teal-500 dark:text-[#00e6b0]",
    circle:
      "border-teal-500/30 bg-teal-500/5 dark:border-[#00dba6]/35 dark:bg-[#00dba6]/5",
    glow: "bg-teal-400/10 dark:bg-[#00e6b0]/12",
  },
  cyan: {
    icon: "text-cyan-500 dark:text-[#00c8ff]",
    circle:
      "border-cyan-500/30 bg-cyan-500/5 dark:border-[#00b9ef]/35 dark:bg-[#00b9ef]/5",
    glow: "bg-cyan-400/10 dark:bg-[#00c8ff]/12",
  },
};

const FeatureCard = ({
  feature,
  title,
  description,
}: {
  feature: FeatureItem;
  title: string;
  description: string;
}) => {
  const Icon = feature.icon;
  const styles = colorStyles[feature.color];

  return (
    <article className="group relative h-42 overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 shadow-[0_4px_18px_rgba(15,23,42,0.035)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 dark:border-[#172638] dark:bg-[#071421]/90 dark:shadow-[0_4px_20px_rgba(0,0,0,0.18)] dark:hover:border-[#21364d] dark:hover:bg-[#081725]">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-10 -inset-s-8 h-32 w-32 rounded-full blur-[50px] ${styles.glow}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-300/50 to-transparent dark:via-white/5"
      />

      <div className="relative flex h-full items-start p-5">
        <div
          className={`flex size-14.5 shrink-0 items-center justify-center rounded-full border shadow-[0_0_24px_rgba(0,0,0,0.03)] ${styles.circle}`}
        >
          <Icon className={`size-7 ${styles.icon}`} strokeWidth={1.8} />
        </div>
        <div className="ms-5 flex h-full min-w-0 flex-1 flex-col pt-1">
          <h3 className="text-[16px] font-semibold leading-5 tracking-[-0.015em] text-slate-900 dark:text-[#f3f6fa]">
            {title}
          </h3>
          <p className="mt-2 max-w-52 text-[14px] leading-[1.55] text-slate-500 dark:text-[#9aa8b8]">
            {description}
          </p>
          <div className="mt-auto flex justify-end pb-0.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 rtl:justify-start rtl:group-hover:-translate-x-0.5 dark:text-[#c7d0da]">
            <ArrowRight className="size-4.25 rtl:hidden" strokeWidth={2.6} />
            <ArrowLeft
              className="hidden size-4.25 rtl:block"
              strokeWidth={2.6}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

const Features = () => {
  const t = useTranslations();

  const bgGlows = [
    "-top-60 left-1/2 h-155 w-250 -translate-x-1/2 bg-cyan-400/4 dark:bg-[#0077ff]/5 blur-[145px]",
    "-left-36 top-20 h-96 w-96 bg-blue-400/3 dark:bg-[#0077ff]/4 blur-[130px]",
  ];

  return (
    <section id="features" className="relative overflow-hidden py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {bgGlows.map((glow, i) => (
          <div key={i} className={`absolute rounded-full ${glow}`} />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-7 sm:px-8 lg:px-10 xl:px-14">
        <header className="mx-auto mb-5 max-w-3xl text-center">
          <div className="mb-2 flex justify-center">
            <div className="inline-flex h-5 items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/4 px-2.5 dark:border-[#00d8e6]/10 dark:bg-[#00d8e6]/3">
              <span className="size-1.5 rounded-full bg-cyan-500 shadow-[0_0_7px_rgba(6,182,212,0.8)] dark:bg-[#00e0d5] dark:shadow-[0_0_7px_rgba(0,224,213,0.9)]" />
              <span className="text-[9px] font-bold uppercase leading-none tracking-[0.22em] text-cyan-600 dark:text-[#00dbe7]">
                {t("Features.badge")}
              </span>
            </div>
          </div>
          <h2 className="text-[31px] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[34px]">
            {t("Features.title")}{" "}
            <span className="bg-linear-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent dark:from-[#00d9d0] dark:to-[#8fe000]">
              {t("Features.titleHighlight")}
            </span>
          </h2>
          <p className="mt-2 text-[12px] leading-5 text-slate-500 dark:text-[#8492a3]">
            {t("Features.subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.titleKey}
              feature={feature}
              title={t(feature.titleKey)}
              description={t(feature.descKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
