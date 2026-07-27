"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Search, FolderOpen, Download, BookOpen, Sprout } from "lucide-react";

type Step = {
  key: string;
  icon: React.ElementType;
  color: string;
  border: string;
  bg: string;
  glow: string;
};

const steps: Step[] = [
  {
    key: "search",
    icon: Search,
    color: "text-cyan-500 dark:text-cyan-400",
    border: "border-cyan-500/25",
    bg: "bg-cyan-500/8",
    glow: "bg-cyan-500/15",
  },
  {
    key: "explore",
    icon: FolderOpen,
    color: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/25",
    bg: "bg-blue-500/8",
    glow: "bg-blue-500/15",
  },
  {
    key: "access",
    icon: Download,
    color: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-500/8",
    glow: "bg-amber-500/15",
  },
];

const secondaryBtnClass =
  "inline-flex h-12 min-w-47.5 items-center justify-center rounded-xl border border-zinc-200 bg-white/30 px-6 text-sm font-semibold text-zinc-800 transition-all duration-300 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/2 dark:text-zinc-200 dark:hover:border-white/16 dark:hover:bg-white/5";

const primaryBtnClass =
  "inline-flex h-12 min-w-47.5 items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-teal-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_8px_30px_-12px_rgba(6,182,212,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_-12px_rgba(6,182,212,0.8)]";

const ResourcesHowItWorks = () => {
  const t = useTranslations("resources.howItWorks");
  const locale = useLocale();

  return (
    <section className="w-full bg-transparent px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-center text-2xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-3xl dark:text-white">
          {t("title")}
        </h2>

        <div className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-12">
          {/* Desktop dotted connectors */}
          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-9.5 hidden md:block">
            <svg
              viewBox="0 0 1000 70"
              preserveAspectRatio="none"
              className="h-17.5 w-full"
              aria-hidden="true"
            >
              <path
                d="M 80 35 C 180 0, 270 0, 420 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                className="text-zinc-300 dark:text-white/25"
              />
              <path
                d="M 580 35 C 730 0, 820 0, 920 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                className="text-zinc-300 dark:text-white/25"
              />
            </svg>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.key}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div
                    className={`absolute inset-0 scale-125 rounded-full opacity-70 blur-2xl ${step.glow}`}
                  />

                  <div
                    className={`relative flex size-19 items-center justify-center rounded-full border ${step.border} ${step.bg}`}
                  >
                    <div
                      className={`flex size-14.5 items-center justify-center rounded-full border ${step.border}`}
                    >
                      <Icon
                        className={`size-8 ${step.color}`}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {index + 1}. {t(`steps.${step.key}.title`)}
                </h3>

                <p className="mt-1.5 max-w-55 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {t(`steps.${step.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA Card */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/25 backdrop-blur-sm dark:border-white/8 dark:bg-white/1.5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-25 left-[10%] size-64 rounded-full bg-blue-500/6 blur-[100px] dark:bg-blue-500/8"
          />

          <div className="relative flex flex-col gap-7 px-6 py-6 lg:flex-row lg:items-center lg:px-8">
            {/* Illustration */}
            <div className="flex items-center gap-3 lg:min-w-32.5">
              <div className="relative">
                <BookOpen
                  className="size-16 text-amber-500 dark:text-amber-400"
                  strokeWidth={1.5}
                />

                <div className="absolute -bottom-1 -inset-e-7">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <Sprout
                      className="size-7 text-emerald-500 dark:text-emerald-400"
                      strokeWidth={1.7}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                {t("cta.title")}
              </h3>

              <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {t("cta.description")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <Link
                href={`/${locale}/departments`}
                className={secondaryBtnClass}
              >
                {t("cta.explore")}
              </Link>

              <Link
                href={`/${locale}/get-started`}
                className={primaryBtnClass}
              >
                {t("cta.getStarted")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHowItWorks;