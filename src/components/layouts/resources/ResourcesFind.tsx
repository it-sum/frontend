"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Presentation,
  CodeXml,
  FileText,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import { RESOURCES_SECTION_CONTAINER_CLASSES } from "@/src/constants/variables";

type FindKey = "study" | "lectures" | "code" | "practice" | "additional";

type FindItem = {
  key: FindKey;
  icon: LucideIcon;
  styles: {
    icon: string;
    bg: string;
    border: string;
    glow: string;
  };
};

const itemsData: FindItem[] = [
  {
    key: "study",
    icon: BookOpen,
    styles: {
      icon: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/8",
      border: "border-blue-500/20",
      glow: "bg-blue-500/10",
    },
  },
  {
    key: "lectures",
    icon: Presentation,
    styles: {
      icon: "text-sky-500 dark:text-sky-400",
      bg: "bg-sky-500/8",
      border: "border-sky-500/20",
      glow: "bg-sky-500/10",
    },
  },
  {
    key: "code",
    icon: CodeXml,
    styles: {
      icon: "text-violet-500 dark:text-violet-400",
      bg: "bg-violet-500/8",
      border: "border-violet-500/20",
      glow: "bg-violet-500/10",
    },
  },
  {
    key: "practice",
    icon: FileText,
    styles: {
      icon: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/8",
      border: "border-emerald-500/20",
      glow: "bg-emerald-500/10",
    },
  },
  {
    key: "additional",
    icon: Layers3,
    styles: {
      icon: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/8",
      border: "border-amber-500/20",
      glow: "bg-amber-500/10",
    },
  },
];

const ResourcesFind = () => {
  const t = useTranslations("resources.find");

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className={RESOURCES_SECTION_CONTAINER_CLASSES}>
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border-x border-b border-zinc-200/80 bg-white/40 shadow-2xl shadow-zinc-300/30 backdrop-blur-xl dark:border-white/8 dark:bg-white/2 dark:shadow-black/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {itemsData.map((item, index) => {
              const Icon = item.icon;
              const { styles } = item;

              return (
                <article
                  key={item.key}
                  className={`relative flex flex-col items-center px-5 py-8 text-center ${
                    index !== itemsData.length - 1
                      ? "border-b border-zinc-200/80 dark:border-white/7 sm:border-b-0 sm:border-e"
                      : ""
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 top-8 size-24 -translate-x-1/2 rounded-full opacity-0 blur-[45px] transition-opacity duration-300 group-hover:opacity-100 ${styles.glow}`}
                  />

                  <div
                    className={`relative flex size-16 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:-translate-y-1 ${styles.bg} ${styles.border}`}
                  >
                    <Icon
                      className={`size-8 ${styles.icon}`}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(`items.${item.key}.title`)}
                  </h3>

                  <p className="mt-1.5 max-w-47.5 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
                    {t(`items.${item.key}.description`)}
                  </p>
                </article>
              );
            })}
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

export default ResourcesFind;
