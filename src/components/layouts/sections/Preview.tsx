"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  LayoutDashboard,
  Users,
} from "lucide-react";

const menu = [
  { labelKey: "menu.dashboard", icon: LayoutDashboard, active: true },
  { labelKey: "menu.courses", icon: BookOpen },
  { labelKey: "menu.quizzes", icon: FileText },
  { labelKey: "menu.resources", icon: BookOpen },
  { labelKey: "menu.progress", icon: BarChart3 },
  { labelKey: "menu.community", icon: Users },
];

const Preview = () => {
  const t = useTranslations("Preview");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-white py-16 dark:bg-[#020812] sm:py-20"
    >
      {/* background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dark:block"
      >
        <div className="absolute left-1/2 top-1/2 h-75 w-225 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/2.5 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* MAIN FRAME */}
        <div className="relative overflow-hidden rounded-[15px] border border-slate-200 bg-[#f8fbff] px-6 py-7 dark:border-[#122033] dark:bg-[#06101d] sm:px-8 lg:min-h-90 lg:px-11.5 lg:py-8.5">
          {/* subtle top line */}
          <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/10 to-transparent" />

          {/* DECORATIVE CURVE */}
          <svg
            aria-hidden
            viewBox="0 0 1400 360"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d="M 410 285 C 460 235, 520 260, 585 292 C 700 350, 850 344, 1010 326"
              fill="none"
              stroke="rgba(14,165,233,.60)"
              strokeWidth="1.2"
            />
            <path
              d="M 1010 326 C 1160 310, 1290 255, 1400 155"
              fill="none"
              stroke="rgba(16,185,129,.65)"
              strokeWidth="1.2"
            />
          </svg>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-14">
            {/* LEFT */}
            <div className="max-w-85">
              {/* eyebrow */}
              <div className="mb-3.25 flex items-center gap-1.75">
                <span className="h-1.25 w-1.25 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,.7)]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-emerald-500 dark:text-emerald-300">
                  {t("eyebrow")}
                </span>
              </div>

              {/* title */}
              <h2 className="text-[29px] font-medium leading-[1.28] tracking-[-0.035em] text-slate-950 dark:text-[#f5f7fa] sm:text-[32px]">
                {t("titleLine1")}
                <br />
                {t("titleLine2")}{" "}
                <span className="bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {t("titleHighlight")}
                </span>
              </h2>

              {/* description */}
              <p className="mt-3.25 max-w-77.5 text-[11.5px] leading-[1.65] text-slate-500 dark:text-[#8d9bad]">
                {t("description")}
              </p>

              {/* button */}
              <button
                type="button"
                className="group mt-5.25 flex h-11.25 items-center justify-between gap-7 rounded-[7px] bg-linear-to-r from-[#1478e9] via-[#08aee7] to-[#6bd22c] px-4.5 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,.16)] transition duration-300 hover:brightness-110"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="h-3.75 w-3.75 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </button>

              <p className="mt-2 text-[9.5px] text-slate-500 dark:text-[#8490a0]">
                {t("noCard")}
              </p>
            </div>

            {/* DASHBOARD PREVIEW */}
            <div className="relative hidden lg:block">
              <div className="relative ms-auto w-full max-w-192.5 overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,.08)] dark:border-[#102238] dark:bg-[#020b15] dark:shadow-[0_18px_55px_rgba(0,0,0,.22)]">
                <div className="grid h-68 grid-cols-[150px_1fr]">
                  {/* SIDEBAR */}
                  <aside className="border-e border-slate-200 px-3.5 py-3.25 dark:border-[#102033]">
                    {/* logo */}
                    <div className="mb-2.75 flex h-6.5 items-center gap-1.75 px-1">
                      <div className="relative h-3.75 w-3.75">
                        <span className="absolute left-0 top-0.5 h-1.5 w-1.5 rotate-45 rounded-[1px] bg-cyan-400" />
                        <span className="absolute bottom-px right-0 h-1.5 w-1.5 rotate-45 rounded-[1px] bg-blue-500" />
                      </div>
                      <span className="text-[9px] font-semibold text-slate-800 dark:text-slate-200">
                        IT-SUM
                      </span>
                    </div>

                    {/* menu */}
                    <nav className="space-y-0.5">
                      {menu.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.labelKey}
                            className={`flex h-7.25 items-center gap-2 rounded-[5px] px-1.75 text-[8px] ${
                              item.active
                                ? "bg-cyan-500/7 text-cyan-500 dark:bg-cyan-400/6 dark:text-cyan-300"
                                : "text-slate-500 dark:text-[#8390a2]"
                            }`}
                          >
                            <Icon className="h-2.75 w-2.75" strokeWidth={1.7} />
                            <span>{t(item.labelKey)}</span>
                          </div>
                        );
                      })}
                    </nav>
                  </aside>

                  {/* CONTENT */}
                  <main className="grid grid-cols-[1.65fr_.82fr] gap-2.25 p-2.5">
                    {/* LEFT DASHBOARD */}
                    <div className="flex min-w-0 flex-col gap-2.25">
                      {/* chart */}
                      <DashboardPanel className="h-37.75">
                        <div className="flex items-center justify-between">
                          <span className="text-[7.5px] font-medium text-slate-700 dark:text-[#cbd5e1]">
                            {t("chart.overview")}
                          </span>
                          <span className="text-[6px] text-slate-400 dark:text-[#657286]">
                            {t("chart.range")}
                          </span>
                        </div>

                        <div className="relative mt-1.5 h-27.5">
                          {/* y labels */}
                          <div className="absolute inset-y-0 left-0 flex w-4.5 flex-col justify-between pb-3.5 text-[5px] text-slate-400 dark:text-[#536173]">
                            <span>150</span>
                            <span>100</span>
                            <span>50</span>
                            <span>0</span>
                          </div>

                          <svg
                            viewBox="0 0 500 100"
                            preserveAspectRatio="none"
                            className="absolute bottom-3.75 left-5.5 right-0 h-21.5 w-[calc(100%-22px)]"
                          >
                            {/* grid */}
                            {[10, 35, 60, 85].map((y) => (
                              <line
                                key={y}
                                x1="0"
                                y1={y}
                                x2="500"
                                y2={y}
                                stroke="currentColor"
                                strokeWidth=".5"
                                className="text-slate-200 dark:text-[#152233]"
                              />
                            ))}

                            {/* green */}
                            <path
                              d="M0 78 C35 66 50 58 72 57 C100 55 112 30 140 34 C172 38 190 62 220 55 C252 47 270 38 300 43 C330 48 348 56 380 47 C415 37 435 32 465 38 C480 40 490 43 500 45"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="1.5"
                            />

                            {/* blue */}
                            <path
                              d="M0 83 C30 70 45 59 70 64 C98 68 115 54 140 50 C170 45 185 25 210 20 C240 14 255 33 282 38 C310 44 325 49 350 43 C380 37 395 18 420 16 C450 14 470 25 500 30"
                              fill="none"
                              stroke="#0ea5e9"
                              strokeWidth="1.8"
                            />

                            {/* dots */}
                            {[
                              [0, 83],
                              [70, 64],
                              [140, 50],
                              [210, 20],
                              [282, 38],
                              [350, 43],
                              [420, 16],
                              [500, 30],
                            ].map(([x, y], i) => (
                              <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="2"
                                fill="#0ea5e9"
                              />
                            ))}
                          </svg>

                          <div className="absolute bottom-0 left-5.5 right-0 flex justify-between text-[5px] text-slate-400 dark:text-[#566477]">
                            <span>{t("chart.months.jan")}</span>
                            <span>{t("chart.months.feb")}</span>
                            <span>{t("chart.months.mar")}</span>
                            <span>{t("chart.months.apr")}</span>
                            <span>{t("chart.months.may")}</span>
                            <span>{t("chart.months.jun")}</span>
                          </div>
                        </div>
                      </DashboardPanel>

                      {/* stats */}
                      <div className="grid flex-1 grid-cols-3 gap-1.75">
                        <MetricCard
                          label={t("metrics.studyTime.label")}
                          value="24.5h"
                          info={t("metrics.studyTime.info")}
                        />
                        <MetricCard
                          label={t("metrics.quizzesPassed.label")}
                          value="1,240"
                          info={t("metrics.quizzesPassed.info")}
                        />
                        <MetricCard
                          label={t("metrics.resourcesRead.label")}
                          value="320"
                          info={t("metrics.resourcesRead.info")}
                        />
                      </div>
                    </div>

                    {/* RIGHT DASHBOARD */}
                    <div className="flex flex-col gap-2.25">
                      {/* progress */}
                      <DashboardPanel className="flex-1">
                        <p className="text-[7.5px] font-medium text-slate-700 dark:text-[#cbd5e1]">
                          {t("overallProgress")}
                        </p>
                        <div className="mt-3.25 flex items-center justify-center gap-2.5">
                          <CircleProgress value={75} />
                          <div>
                            <p className="text-[6px] text-slate-400 dark:text-[#758398]">
                              {t("onTrack")}
                            </p>
                            <p className="mt-0.75 text-[5.5px] text-emerald-400">
                              {t("monthGrowth")}
                            </p>
                          </div>
                        </div>
                      </DashboardPanel>

                      {/* accuracy */}
                      <DashboardPanel className="flex-1">
                        <p className="text-[7.5px] font-medium text-slate-700 dark:text-[#cbd5e1]">
                          {t("quizAccuracy")}
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-2.5">
                          <CircleProgress value={90} />
                          <span className="text-[6px] text-slate-400 dark:text-[#8390a2]">
                            {t("excellent")}
                          </span>
                        </div>
                      </DashboardPanel>
                    </div>
                  </main>
                </div>
              </div>
            </div>

            {/* MOBILE PREVIEW */}
            <div className="grid grid-cols-2 gap-2 lg:hidden">
              <MetricCard
                label={t("metrics.studyTime.label")}
                value="24.5h"
                info={t("metrics.studyTime.info")}
              />
              <MetricCard
                label={t("overallProgress")}
                value="75%"
                info={t("onTrack")}
              />
              <MetricCard
                label={t("quizAccuracy")}
                value="90%"
                info={t("excellent")}
              />
              <MetricCard
                label={t("metrics.resourcesRead.label")}
                value="320"
                info={t("metrics.resourcesRead.info")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =====================================================
   PANEL
===================================================== */
function DashboardPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[7px] border border-slate-200 bg-slate-50/80 p-2.25 dark:border-[#11243a] dark:bg-[#06111e] ${className}`}
    >
      {children}
    </div>
  );
}

/* =====================================================
   METRIC
===================================================== */
function MetricCard({
  label,
  value,
  info,
}: {
  label: string;
  value: string;
  info: string;
}) {
  return (
    <div className="rounded-[7px] border border-slate-200 bg-slate-50/80 px-2.25 py-2 dark:border-[#11243a] dark:bg-[#06111e]">
      <p className="truncate text-[6.5px] text-slate-500 dark:text-[#7f8da0]">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-medium tracking-tight text-slate-900 dark:text-[#e8edf4]">
        {value}
      </p>
      <p className="mt-0.5 truncate text-[5.5px] text-emerald-500 dark:text-emerald-400">
        {info}
      </p>
    </div>
  );
}

/* =====================================================
   PROGRESS RING
===================================================== */
function CircleProgress({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-slate-200 dark:text-[#122438]"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="drop-shadow-[0_0_3px_rgba(34,211,238,.55)]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-medium text-slate-800 dark:text-white">
        {value}%
      </span>
    </div>
  );
}

export default Preview;
