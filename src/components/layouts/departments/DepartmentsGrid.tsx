"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Code2,
  Database,
  FileText,
  FolderOpen,
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
  subjects: number;
  summaries: number;
  resources: number;
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
    subjects: 12,
    summaries: 340,
    resources: 210,
    icon: Code2,
    iconClassName: "text-blue-600 dark:text-blue-400",
    iconBgClassName: "border-blue-500/30 bg-blue-500/10",
    dotColor: "#3b82f6",
  },
  {
    id: "computer-science",
    nameKey: "cs.name",
    descKey: "cs.desc",
    subjects: 15,
    summaries: 420,
    resources: 280,
    icon: Code2,
    iconClassName: "text-emerald-600 dark:text-emerald-400",
    iconBgClassName: "border-emerald-500/30 bg-emerald-500/10",
    dotColor: "#10b981",
  },
  {
    id: "artificial-intelligence",
    nameKey: "ai.name",
    descKey: "ai.desc",
    subjects: 10,
    summaries: 210,
    resources: 150,
    icon: Bot,
    iconClassName: "text-violet-600 dark:text-violet-400",
    iconBgClassName: "border-violet-500/30 bg-violet-500/10",
    dotColor: "#8b5cf6",
  },
  {
    id: "cyber-security",
    nameKey: "cyber.name",
    descKey: "cyber.desc",
    subjects: 11,
    summaries: 230,
    resources: 160,
    icon: ShieldCheck,
    iconClassName: "text-rose-600 dark:text-rose-400",
    iconBgClassName: "border-rose-500/30 bg-rose-500/10",
    dotColor: "#f43f5e",
  },
  {
    id: "information-systems",
    nameKey: "is.name",
    descKey: "is.desc",
    subjects: 14,
    summaries: 270,
    resources: 200,
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
  const locale = useLocale();
  const isArabic = locale === "ar";

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
                  className="group relative flex min-h-66.25 flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/8 bg-white/80 dark:bg-[#04101d] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(37,99,235,0.08)]"
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
                      <p className="mt-2 line-clamp-3 text-[11px] leading-[1.7] text-slate-500 dark:text-slate-400">
                        {t(department.descKey)}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 grid grid-cols-3 divide-x divide-slate-100 dark:divide-white/6 rtl:divide-x-reverse">
                    <DepartmentStat
                      icon={BookOpen}
                      value={department.subjects}
                      label={t("stats.subjects")}
                      iconClassName="text-blue-500"
                    />
                    <DepartmentStat
                      icon={FileText}
                      value={department.summaries}
                      label={t("stats.summaries")}
                      iconClassName="text-violet-500"
                    />
                    <DepartmentStat
                      icon={FolderOpen}
                      value={department.resources}
                      label={t("stats.resources")}
                      iconClassName="text-orange-500"
                    />
                  </div>

                  <Link
                    href={`/departments/${department.id}`}
                    className="relative z-10 mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-50/80 text-[11px] font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white dark:bg-blue-500/8 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white"
                  >
                    {t("explore")}
                    <ArrowRight
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                    />
                  </Link>
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

// =========================================================
// SUB COMPONENTS
// =========================================================
type DepartmentStatProps = {
  icon: React.ElementType;
  value: number | string;
  label: string;
  iconClassName: string;
};

const DepartmentStat = ({
  icon: Icon,
  value,
  label,
  iconClassName,
}: DepartmentStatProps) => {
  return (
    <div className="flex items-start justify-center gap-2 px-2">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClassName}`} />
      <div>
        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {value}
        </p>
        <p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
};

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
