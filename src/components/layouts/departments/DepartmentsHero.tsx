"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search, Sparkles } from "lucide-react";

import universityImg from "@/src/assets/images/university.jpeg";

type DepartmentsHeroProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function DepartmentsHero({
  search,
  setSearch,
}: DepartmentsHeroProps) {
  const t = useTranslations("DepartmentsPage");

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
            <label htmlFor="department-search" className="sr-only">
              {t("searchLabel")}
            </label>
            <input
              id="department-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search")}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/7 dark:border-white/8 dark:bg-white/3.5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500/50 ps-11 pe-4"
            />
          </div>
        </div>

        {/* Illustration */}
        <div className="relative flex min-h-70 items-center justify-center lg:min-h-95">
          <div className="relative w-full max-w-132.5 overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl shadow-blue-950/10 dark:border-white/8 dark:shadow-black/30">
            <Image
              src={universityImg}
              alt=""
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
