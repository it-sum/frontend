"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  BookOpen,
  Compass,
  PencilLine,
  Trophy,
  type LucideIcon,
} from "lucide-react";

type StepTone = "cyan" | "purple" | "emerald" | "amber";

type Step = {
  number: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  tone: StepTone;
};

const steps: Step[] = [
  {
    number: "01",
    titleKey: "steps.explore.title",
    descriptionKey: "steps.explore.description",
    icon: Compass,
    tone: "cyan",
  },
  {
    number: "02",
    titleKey: "steps.learn.title",
    descriptionKey: "steps.learn.description",
    icon: BookOpen,
    tone: "purple",
  },
  {
    number: "03",
    titleKey: "steps.practice.title",
    descriptionKey: "steps.practice.description",
    icon: PencilLine,
    tone: "emerald",
  },
  {
    number: "04",
    titleKey: "steps.achieve.title",
    descriptionKey: "steps.achieve.description",
    icon: Trophy,
    tone: "amber",
  },
];

const toneStyles = {
  cyan: {
    icon: "text-cyan-400",
    number: "text-cyan-400",
    ring: "border-cyan-400/55",
    innerRing: "border-cyan-400/25",
    innerBg: "bg-cyan-400/[0.07]",
    glow: "bg-cyan-400/15",
    shadow: "shadow-[0_0_26px_rgba(34,211,238,0.12)]",
  },
  purple: {
    icon: "text-fuchsia-400",
    number: "text-fuchsia-400",
    ring: "border-fuchsia-400/55",
    innerRing: "border-fuchsia-400/25",
    innerBg: "bg-fuchsia-400/[0.07]",
    glow: "bg-fuchsia-400/15",
    shadow: "shadow-[0_0_26px_rgba(232,121,249,0.12)]",
  },
  emerald: {
    icon: "text-emerald-400",
    number: "text-emerald-400",
    ring: "border-emerald-400/55",
    innerRing: "border-emerald-400/25",
    innerBg: "bg-emerald-400/[0.07]",
    glow: "bg-emerald-400/15",
    shadow: "shadow-[0_0_26px_rgba(52,211,153,0.12)]",
  },
  amber: {
    icon: "text-amber-400",
    number: "text-amber-400",
    ring: "border-amber-400/55",
    innerRing: "border-amber-400/25",
    innerBg: "bg-amber-400/[0.07]",
    glow: "bg-amber-400/15",
    shadow: "shadow-[0_0_26px_rgba(251,191,36,0.12)]",
  },
};

const connectorColors = [
  {
    start: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.95)]",
    end: "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.95)]",
  },
  {
    start: "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.95)]",
    end: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]",
  },
  {
    start: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.95)]",
    end: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.95)]",
  },
];

const Works = () => {
  const t = useTranslations("Works");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      id="works"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Fixed Tailwind v4 class: max-w-300 */}
      <div className="relative mx-auto w-full max-w-300 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-3 flex items-center justify-center gap-2">
            {/* Fixed Tailwind v4 class: h-1 w-1 */}
            <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.9)]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-500 dark:text-cyan-300 sm:text-[11px]">
              {t("eyebrow")}
            </p>
            {/* Fixed Tailwind v4 class: h-1 w-1 */}
            <span className="h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.9)]" />
          </div>
          <h2 className="text-[28px] font-semibold tracking-[-0.035em] sm:text-[32px] lg:text-[36px]">
            {t("title")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-5 text-slate-500 dark:text-slate-400 sm:text-[13px]">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Fixed Tailwind v4 class: top-10.5 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-10.5 z-0 hidden md:block"
          >
            <div className="grid grid-cols-3">
              {connectorColors.map((connector, index) => (
                <div key={index} className="relative flex h-px items-center">
                  {/* Fixed Tailwind v4 class: h-1.75 w-1.75 */}
                  <span
                    className={`absolute left-[22%] z-20 h-1.75 w-1.75 -translate-x-1/2 rounded-full ${connector.start}`}
                  />
                  <div className="absolute left-[22%] right-[22%] top-1/2 -translate-y-1/2 border-t border-dashed border-slate-300 dark:border-slate-600/80" />
                  {/* Fixed Tailwind v4 class: h-1.75 w-1.75 */}
                  <span
                    className={`absolute right-[22%] z-20 h-1.75 w-1.75 translate-x-1/2 rounded-full ${connector.end}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const styles = toneStyles[step.tone];

              return (
                <article
                  key={step.number}
                  className="group relative flex items-start gap-5 px-2 md:flex-col md:items-center md:gap-0 md:text-center"
                >
                  {index < steps.length - 1 && (
                    /* Fixed Tailwind v4 classes: inset-s-10.25 top-21 */
                    <div
                      aria-hidden="true"
                      className="absolute inset-s-10.25 top-21 h-[calc(100%-48px)] border-s border-dashed border-slate-300 dark:border-slate-700 md:hidden"
                    />
                  )}

                  {/* Fixed Tailwind v4 classes: h-21 w-21 */}
                  <div
                    className={`relative flex h-21 w-21 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-[1.04] ${styles.ring} ${styles.shadow}`}
                  >
                    {/* Fixed Tailwind v4 classes: h-13 w-13 */}
                    <div
                      className={`pointer-events-none absolute left-1/2 top-1/2 h-13 w-13 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[18px] ${styles.glow}`}
                    />
                    {/* Fixed Tailwind v4 classes: h-14 w-14 */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-xl ${styles.innerRing} ${styles.innerBg}`}
                    >
                      {/* Fixed Tailwind v4 classes: h-6 w-6 */}
                      <Icon
                        strokeWidth={1.7}
                        className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
                      />
                    </div>
                  </div>

                  {/* Fixed Tailwind v4 class: md:pt-3.25 */}
                  <div className="pt-1 md:pt-3.25">
                    <span
                      className={`text-[13px] font-semibold leading-none tracking-[0.04em] ${styles.number}`}
                    >
                      {step.number}
                    </span>
                    {/* Fixed Tailwind v4 class: mt-1.75 */}
                    <h3 className="mt-1.75 text-[15px] font-semibold tracking-[-0.015em]">
                      {t(step.titleKey)}
                    </h3>
                    {/* Fixed Tailwind v4 classes: mt-1.25 max-w-47.5 */}
                    <p className="mt-1.25 max-w-47.5 text-[11px] leading-[1.55] text-slate-500 dark:text-slate-400 md:mx-auto">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
