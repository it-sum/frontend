"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  Code2,
  Database,
  FolderOpen,
  Globe2,
  Heart,
  RefreshCw,
  Settings2,
  Star,
  Wifi,
} from "lucide-react";

const reasonIcons = [Star, FolderOpen, Heart, RefreshCw];

const DepartmentsFeatured = () => {
  const t = useTranslations("DepartmentsFeatured");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // قراءة المصفوفات من ملفات الترجمة
  const features = t.raw("features") as string[];
  const reasons = t.raw("reasons") as { title: string; description: string }[];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[2.25fr_1fr]">
          {/* =====================================================
              FEATURED DEPARTMENT
          ===================================================== */}
          <div className="relative min-h-88.75 overflow-hidden rounded-[22px] border border-blue-100/80 bg-linear-to-r from-[#f5f9ff] via-[#edf5ff] to-[#eaf4ff] shadow-[0_8px_35px_rgba(37,99,235,0.04)] dark:border-white/7 dark:bg-[linear-gradient(120deg,rgba(13,24,43,0.95),rgba(9,20,37,0.96),rgba(8,18,32,0.98))]">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-[12%] top-1/2 h-75 w-75 -translate-y-1/2 rounded-full bg-blue-400/9 blur-[75px] dark:bg-blue-500/8" />
              <div className="absolute left-[35%] top-0 h-50 w-50 rounded-full bg-white/70 blur-[70px] dark:bg-blue-400/2" />
              <div
                className="absolute inset-0 opacity-[0.035] dark:opacity-[0.025]"
                style={{
                  backgroundImage:
                    "radial-gradient(#3b82f6 0.7px, transparent 0.7px)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            <div className="relative z-10 grid h-full lg:grid-cols-[1.05fr_0.95fr]">
              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-9">
                <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.04em] text-blue-600 dark:text-blue-400">
                  {t("eyebrow")}
                </span>

                <h2 className="text-[26px] font-bold tracking-[-0.035em] text-[#10214b] sm:text-[30px] dark:text-white">
                  {t("title")}
                </h2>

                <p className="mt-3 max-w-142.5 text-[13px] leading-[1.75] text-slate-600 dark:text-slate-400">
                  {t("description")}
                </p>

                {/* FEATURES */}
                <div className="mt-6 grid max-w-117.5 grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex h-9.5 items-center gap-2.5 rounded-lg border border-blue-100/80 bg-white/75 px-3 shadow-[0_3px_12px_rgba(15,23,42,0.025)] backdrop-blur-sm dark:border-white/6 dark:bg-white/3.5"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/8">
                        <Check
                          className="h-3.5 w-3.5 text-cyan-500"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#203765] dark:text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                <Link
                  href="/departments/information-technology"
                  className="group mt-5 flex h-10.5 w-fit items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_28px_rgba(37,99,235,0.28)]"
                >
                  {t("button")}
                  <ArrowRight
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      isArabic
                        ? "rotate-180 group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </Link>
              </div>

              {/* =================================================
                  LAPTOP ILLUSTRATION
              ================================================= */}
              <div className="relative hidden min-h-87.5 items-center justify-center lg:flex">
                {/* Connection lines */}
                <div className="absolute left-[18%] top-[27%] h-18.5 w-22.5 rounded-tl-xl border-l border-t border-dashed border-blue-400/50" />
                <div className="absolute right-[15%] top-[27%] h-18.5 w-21.25 rounded-tr-xl border-r border-t border-dashed border-blue-400/50" />
                <div className="absolute bottom-[25%] left-[12%] h-px w-22.5 border-t border-dashed border-blue-400/50" />
                <div className="absolute bottom-[25%] right-[11%] h-px w-22.5 border-t border-dashed border-blue-400/50" />

                {/* Top Globe */}
                <FloatingIcon
                  className="left-1/2 top-5.5 -translate-x-1/2"
                  icon={Globe2}
                  iconClass="text-blue-700 dark:text-blue-300"
                  boxClass="bg-blue-200/90 dark:bg-blue-500/15"
                />

                {/* Code */}
                <FloatingIcon
                  className="left-[11%] top-16.25"
                  icon={Code2}
                  iconClass="text-blue-700 dark:text-blue-300"
                  boxClass="bg-white/90 dark:bg-white/6"
                />

                {/* Wifi */}
                <FloatingIcon
                  className="right-[10%] top-17.5"
                  icon={Wifi}
                  iconClass="text-cyan-500"
                  boxClass="bg-cyan-100/90 dark:bg-cyan-500/10"
                />

                {/* Database */}
                <FloatingIcon
                  className="bottom-18.25 left-[5%]"
                  icon={Database}
                  iconClass="text-blue-600 dark:text-blue-400"
                  boxClass="bg-violet-100/90 dark:bg-violet-500/10"
                />

                {/* Settings */}
                <FloatingIcon
                  className="bottom-17.5 right-[5%]"
                  icon={Settings2}
                  iconClass="text-blue-500 dark:text-blue-400"
                  boxClass="bg-white/90 dark:bg-white/6"
                />

                {/* Laptop */}
                <div className="relative z-10 mt-12">
                  {/* Screen */}
                  <div className="relative h-40 w-63.75 overflow-hidden rounded-t-[11px] border-[7px] border-[#263e69] bg-[#0c1c35] shadow-[0_15px_35px_rgba(30,64,175,0.2)] dark:border-[#243553]">
                    {/* Browser top */}
                    <div className="flex h-6 items-center gap-1.5 border-b border-white/6 bg-[#112643] px-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                      <div className="ml-3 h-2 w-16 rounded-full bg-white/6" />
                    </div>

                    {/* Code editor */}
                    <div className="flex h-[calc(100%-24px)]">
                      <div className="w-[25%] border-r border-white/5 bg-[#0d203a] p-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className="mb-2 h-1.5 rounded-full bg-blue-400/20"
                            style={{ width: `${45 + ((index * 13) % 40)}%` }}
                          />
                        ))}
                      </div>

                      <div className="flex-1 p-3">
                        <CodeLine width="65%" />
                        <CodeLine width="45%" indent />
                        <CodeLine width="78%" />
                        <CodeLine width="55%" indent />
                        <CodeLine width="70%" />
                        <CodeLine width="38%" indent />
                      </div>
                    </div>

                    {/* Small UI card */}
                    <div className="absolute right-3 top-10 w-18 rounded-md border border-blue-400/10 bg-blue-400/8 p-2">
                      <div className="h-1.5 w-8 rounded-full bg-blue-300/40" />
                      <div className="mt-2 h-1.5 w-12 rounded-full bg-cyan-300/20" />
                      <div className="mt-1 h-1.5 w-9 rounded-full bg-cyan-300/20" />
                    </div>
                  </div>

                  {/* Laptop bottom */}
                  <div className="relative mx-auto h-3 w-68.75 rounded-b-md bg-linear-to-b from-[#8ba2cc] to-[#526d9d] dark:from-[#526888] dark:to-[#344863]">
                    <div className="absolute left-1/2 top-0 h-1.5 w-14 -translate-x-1/2 rounded-b-md bg-[#7088b2]" />
                  </div>

                  {/* Keyboard base */}
                  <div className="mx-auto h-3 w-76.25 rounded-b-[50%] bg-linear-to-b from-[#7289b4] to-[#3f5a8c] shadow-[0_12px_20px_rgba(30,64,175,0.15)] dark:from-[#425a7d] dark:to-[#263b5b]" />

                  {/* Shadow */}
                  <div className="absolute -bottom-6 left-1/2 h-6 w-70 -translate-x-1/2 rounded-full bg-blue-600/10 blur-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              WHY CHOOSE IT-SUM
          ===================================================== */}
          <aside className="rounded-[22px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_8px_35px_rgba(15,23,42,0.035)] backdrop-blur-sm dark:border-white/7 dark:bg-white/2.5 sm:p-7">
            <h3 className="text-[17px] font-bold tracking-tight text-[#10214b] dark:text-white">
              {t("whyTitle")}
            </h3>

            <div className="mt-5 space-y-5">
              {reasons.map((reason, index) => {
                const Icon = reasonIcons[index];
                return (
                  <div
                    key={reason.title}
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/8 transition-colors group-hover:bg-blue-500/12 dark:bg-blue-500/10">
                      <Icon
                        className="h-5 w-5 text-blue-600 dark:text-blue-400"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-[12px] font-bold text-[#18305f] dark:text-slate-100">
                        {reason.title}
                      </h4>
                      <p className="mt-1 max-w-65 text-[11px] leading-normal text-slate-500 dark:text-slate-400">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

type FloatingIconProps = {
  icon: React.ElementType;
  className?: string;
  iconClass?: string;
  boxClass?: string;
};

const FloatingIcon = ({
  icon: Icon,
  className = "",
  iconClass = "",
  boxClass = "",
}: FloatingIconProps) => {
  return (
    <div
      className={`absolute z-20 flex h-13.5 w-13.5 items-center justify-center rounded-xl border border-white/60 shadow-[0_10px_25px_rgba(37,99,235,0.1)] backdrop-blur-md dark:border-white/6 ${boxClass} ${className}`}
    >
      <Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={1.8} />
    </div>
  );
};

const CodeLine = ({
  width,
  indent = false,
}: {
  width: string;
  indent?: boolean;
}) => {
  return (
    <div className={`mb-2 flex items-center gap-1.5 ${indent ? "ml-3" : ""}`}>
      <span className="h-1.5 w-3 rounded-full bg-violet-400/60" />
      <span className="h-1.5 rounded-full bg-blue-400/40" style={{ width }} />
    </div>
  );
};

export default DepartmentsFeatured;
