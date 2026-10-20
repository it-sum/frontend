"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  FileText,
  FolderOpen,
  ClipboardList,
  FlaskConical,
  Code2,
  FilePlus2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { RESOURCES_SECTION_CONTAINER_CLASSES } from "@/src/constants/variables";

type ResourceKey =
  | "books"
  | "slides"
  | "assignments"
  | "labs"
  | "code"
  | "exams"
  | "cheatsheets";

type ResourceType = {
  key: ResourceKey;
  icon: LucideIcon;
  styles: {
    icon: string;
    bg: string;
    border: string;
    line: string;
    glow: string;
  };
};

const resourceTypes: ResourceType[] = [
  {
    key: "books",
    icon: FileText,
    styles: {
      icon: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-500/8",
      border: "border-rose-500/20",
      line: "bg-rose-500",
      glow: "bg-rose-500/10",
    },
  },
  {
    key: "slides",
    icon: FolderOpen,
    styles: {
      icon: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/8",
      border: "border-amber-500/20",
      line: "bg-amber-500",
      glow: "bg-amber-500/10",
    },
  },
  {
    key: "assignments",
    icon: ClipboardList,
    styles: {
      icon: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/8",
      border: "border-emerald-500/20",
      line: "bg-emerald-500",
      glow: "bg-emerald-500/10",
    },
  },
  {
    key: "labs",
    icon: FlaskConical,
    styles: {
      icon: "text-violet-500 dark:text-violet-400",
      bg: "bg-violet-500/8",
      border: "border-violet-500/20",
      line: "bg-violet-500",
      glow: "bg-violet-500/10",
    },
  },
  {
    key: "code",
    icon: Code2,
    styles: {
      icon: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/8",
      border: "border-blue-500/20",
      line: "bg-blue-500",
      glow: "bg-blue-500/10",
    },
  },
  {
    key: "exams",
    icon: FilePlus2,
    styles: {
      icon: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/8",
      border: "border-amber-500/20",
      line: "bg-amber-500",
      glow: "bg-amber-500/10",
    },
  },
  {
    key: "cheatsheets",
    icon: GraduationCap,
    styles: {
      icon: "text-cyan-500 dark:text-cyan-400",
      bg: "bg-cyan-500/8",
      border: "border-cyan-500/20",
      line: "bg-cyan-500",
      glow: "bg-cyan-500/10",
    },
  },
];

const ResourcesTypes = () => {
  const t = useTranslations("resources.types");

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className={RESOURCES_SECTION_CONTAINER_CLASSES}>
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
            {t("statusLabel")}
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-4xl dark:text-white">
            {t("title")}{" "}
            <span className="bg-linear-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
              {t("highlight")}
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resourceTypes.map((resource) => {
            const Icon = resource.icon;
            const { styles } = resource;

            return (
              <article
                key={resource.key}
                className="relative flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white/40 p-5 dark:border-white/8 dark:bg-white/2"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-6 left-1/2 size-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${styles.glow}`}
                />
                <div
                  className={`relative flex size-12 shrink-0 items-center justify-center rounded-xl border ${styles.bg} ${styles.border}`}
                >
                  <Icon className={`size-6 ${styles.icon}`} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {t(`items.${resource.key}.title`)}
                </h3>
                <div className={`mt-3 h-1 w-8 rounded-full ${styles.line}`} />
                <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {t(`items.${resource.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesTypes;
