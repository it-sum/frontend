"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  FileText,
  FolderOpen,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";

import universityImg from "@/src/assets/images/university.jpeg";
// استيراد البيانات من مكون الشبكة لاستخدامها في حساب الإحصائيات
import { departmentsData } from "./DepartmentsGrid";

type DepartmentsHeroProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function DepartmentsHero({
  search,
  setSearch,
}: DepartmentsHeroProps) {
  const t = useTranslations("DepartmentsPage");

  const stats = [
    {
      label: t("stats.departments"),
      value: departmentsData.length,
      icon: GraduationCap,
      iconClassName: "text-blue-600 dark:text-blue-400",
      bgClassName: "bg-blue-500/10",
    },
    {
      label: t("stats.subjects"),
      value: "62+",
      icon: BookOpen,
      iconClassName: "text-emerald-600 dark:text-emerald-400",
      bgClassName: "bg-emerald-500/10",
    },
    {
      label: t("stats.summaries"),
      value: "1,240+",
      icon: FileText,
      iconClassName: "text-violet-600 dark:text-violet-400",
      bgClassName: "bg-violet-500/10",
    },
    {
      label: t("stats.resources"),
      value: "850+",
      icon: FolderOpen,
      iconClassName: "text-orange-600 dark:text-orange-400",
      bgClassName: "bg-orange-500/10",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/6">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 lg:pb-16 lg:pt-24">
        {/* Hero Content */}
        <div className="relative z-10 min-w-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/15 bg-blue-500/6 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-400/15 dark:bg-blue-400/6 dark:text-blue-400">
            <Sparkles className="h-3.5 w-3.5" />
            {t("eyebrow")}
          </div>

          <h1 className="max-w-full text-[36px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
            <span className="block">{t("title1")}</span>
            <span className="mt-1 block bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-emerald-400">
              {t("title2")}
            </span>
          </h1>

          <p className="mt-5 max-w-full text-sm leading-6 text-slate-500 sm:text-[15px] dark:text-slate-400">
            {t("description")}
          </p>

          {/* Search */}
          <div className="relative mt-7 w-full max-w-135">
            <div className="pointer-events-none absolute inset-y-0 inset-s-4 z-10 flex items-center">
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/7 dark:border-white/8 dark:bg-white/3.5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500/50 ps-11 pe-4"
            />
          </div>

          {/* Stats */}
          <div className="mt-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex min-h-19 items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] backdrop-blur-xl transition-colors dark:border-white/7 dark:bg-white/2.5"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bgClassName}`}
                  >
                    <Icon className={`h-4.25 w-4.25 ${stat.iconClassName}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[17px] font-bold leading-none tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 truncate text-[10px] font-medium text-slate-400 dark:text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative flex min-h-70 items-center justify-center lg:min-h-95">
          <div className="relative w-full max-w-132.5 overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl shadow-blue-950/10 dark:border-white/8 dark:shadow-black/30">
            <Image
              src={universityImg}
              alt="IT-SUM University"
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
