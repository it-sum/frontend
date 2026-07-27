"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FolderOpen,
  ShieldCheck,
  LockKeyhole,
  Heart,
  type LucideIcon,
} from "lucide-react";

// استيراد الصورة بشكل ثابت
import folder from "@/src/assets/images/folder.webp";

// =========================================================
// DATA CONFIG
// =========================================================
type Feature = {
  key: string;
  icon: LucideIcon;
  iconClass: string;
  iconBg: string;
  border: string;
};

const featuresData: Feature[] = [
  {
    key: "formats",
    icon: FolderOpen,
    iconClass: "text-violet-500 dark:text-violet-400",
    iconBg: "bg-violet-500/10",
    border: "border-violet-500/15 dark:border-violet-400/15",
  },
  {
    key: "verified",
    icon: ShieldCheck,
    iconClass: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
    border: "border-emerald-500/15 dark:border-emerald-400/15",
  },
  {
    key: "free",
    icon: LockKeyhole,
    iconClass: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10",
    border: "border-amber-500/15 dark:border-amber-400/15",
  },
  {
    key: "students",
    icon: Heart,
    iconClass: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-500/10",
    border: "border-rose-500/15 dark:border-rose-400/15",
  },
];

// =========================================================
// MAIN COMPONENT
// =========================================================
const ResourcesHero = () => {
  const t = useTranslations("resources.hero");

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Main Hero */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Content */}
          <div className="relative z-10 text-center lg:text-start">
            <h1 className="text-4xl font-bold tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-[58px] lg:leading-[1.08] dark:text-white">
              <span className="block">{t("title")}</span>
              {/* Fixed Tailwind v4 classes */}
              <span className="mt-2 block bg-linear-to-r from-cyan-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {t("highlight")}
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-7 text-zinc-600 sm:text-base lg:mx-0 dark:text-zinc-400">
              {t("description")}
            </p>
          </div>

          {/* Folder Artwork */}
          <div className="relative flex min-h-70 items-center justify-center sm:min-h-85 lg:min-h-97.5">
            {/* Soft glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/6 blur-[80px] dark:bg-blue-500/8"
            />

            <Image
              src={folder}
              alt={t("imageAlt")}
              width={650}
              height={520}
              priority
              className="relative z-10 h-auto w-full max-w-135 select-none object-contain drop-shadow-[0_30px_45px_rgba(0,40,130,0.15)] dark:drop-shadow-[0_30px_50px_rgba(0,80,255,0.12)]"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {featuresData.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="group flex min-h-23.5 items-center gap-4 rounded-2xl border border-zinc-200/70 bg-white/30 px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white/50 dark:border-white/7 dark:bg-white/1.5 dark:hover:border-white/12 dark:hover:bg-white/3 sm:px-5"
              >
                {/* Icon */}
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl border ${feature.iconBg} ${feature.border}`}
                >
                  <Icon
                    strokeWidth={1.8}
                    className={`size-6 ${feature.iconClass}`}
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
