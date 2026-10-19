"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Bot,
  Code2,
  Database,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// =========================================================
// DATA CONFIG
// =========================================================
export type Department = {
  id: string;
  nameKey: string;
  descKey: string;
  icon: LucideIcon;
  iconClassName: string;
  iconBgClassName: string;
  dotColor: string;
};

export const departmentsData: Department[] = [
  {
    id: "information-technology",
    nameKey: "it.name",
    descKey: "it.desc",
    icon: Code2,
    iconClassName: "text-blue-600 dark:text-blue-400",
    iconBgClassName: "border-blue-500/30 bg-blue-500/10",
    dotColor: "#3b82f6",
  },
  {
    id: "computer-science",
    nameKey: "cs.name",
    descKey: "cs.desc",
    icon: Code2,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    iconBgClassName: "border-emerald-500/30 bg-emerald-500/10",
    dotColor: "#10b981",
  },
  {
    id: "artificial-intelligence",
    nameKey: "ai.name",
    descKey: "ai.desc",
    icon: Bot,
    iconClassName: "text-violet-600 dark:text-violet-400",
    iconBgClassName: "border-violet-500/30 bg-violet-500/10",
    dotColor: "#8b5cf6",
  },
  {
    id: "cyber-security",
    nameKey: "cyber.name",
    descKey: "cyber.desc",
    icon: ShieldCheck,
    iconClassName: "text-rose-600 dark:text-rose-400",
    iconBgClassName: "border-rose-500/30 bg-rose-500/10",
    dotColor: "#f43f5e",
  },
  {
    id: "information-systems",
    nameKey: "is.name",
    descKey: "is.desc",
    icon: Database,
    iconClassName: "text-orange-600 dark:text-orange-400",
    iconBgClassName: "border-orange-500/30 bg-orange-500/10",
    dotColor: "#f97316",
  },
];

type DepartmentsGridProps = {
  search: string;
};

export default function DepartmentsGrid({ search }: DepartmentsGridProps) {
  const t = useTranslations("DepartmentsPage");

  const filteredDepartments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return departmentsData;

    return departmentsData.filter((department) => {
      const name = t(department.nameKey).toLowerCase();
      const desc = t(department.descKey).toLowerCase();
      return name.includes(query) || desc.includes(query);
    });
  }, [search, t]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        {filteredDepartments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredDepartments.map((department) => {
              const Icon = department.icon;

              return (
                <article
                  key={department.id}
                  className="group relative flex min-h-52 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 transition-colors dark:border-white/8 dark:bg-[#04101d]"
                >
                  <DotPattern color={department.dotColor} />

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${department.iconBgClassName}`}
                    >
                      <Icon
                        className={`h-7 w-7 ${department.iconClassName}`}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-[15px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                        {t(department.nameKey)}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {t(department.descKey)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-75 flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h2 className="mt-5 text-lg font-bold">{t("noResults")}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("noResultsDescription")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function DotPattern({ color }: { color: string }) {
  return (
    <div
      className="pointer-events-none absolute top-0 right-0 h-24 w-28 opacity-35"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "10px 10px",
        maskImage: "linear-gradient(to bottom left, black 0%, transparent 75%)",
        WebkitMaskImage:
          "linear-gradient(to bottom left, black 0%, transparent 75%)",
      }}
    />
  );
}
