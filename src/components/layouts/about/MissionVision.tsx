"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Eye, Target, type LucideIcon } from "lucide-react";

// =========================================================
// TYPES & DATA CONFIG
// =========================================================

type CardVariant = "blue" | "emerald";

type CardData = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  variant: CardVariant;
};

const cardsData: CardData[] = [
  {
    icon: Target,
    titleKey: "missionTitle",
    descKey: "missionDesc",
    variant: "blue",
  },
  {
    icon: Eye,
    titleKey: "visionTitle",
    descKey: "visionDesc",
    variant: "emerald",
  },
];

const variantStyles: Record<
  CardVariant,
  {
    border: string;
    bg: string;
    iconBg: string;
    iconText: string;
    dotColor: string;
  }
> = {
  blue: {
    border: "border-blue-500/20",
    bg: "bg-linear-to-br from-blue-500/6 via-white to-blue-500/3 dark:from-[#06172a] dark:via-[#061321] dark:to-[#05203b]",
    iconBg: "border-blue-500/30 bg-blue-500/10",
    iconText: "text-[#008cff]",
    dotColor: "#008cff",
  },
  emerald: {
    border: "border-emerald-500/20",
    bg: "bg-linear-to-br from-emerald-500/6 via-white to-emerald-500/3 dark:from-[#05211f] dark:via-[#061817] dark:to-[#06241f]",
    iconBg: "border-emerald-500/30 bg-emerald-500/10",
    iconText: "text-[#00d98b]",
    dotColor: "#00d98b",
  },
};

// =========================================================
// MAIN COMPONENT
// =========================================================

const MissionVision = () => {
  const t = useTranslations("MissionVision");

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-500/15 bg-sky-500/6 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-sky-500">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[40px]">
            {t("titlePrefix")}{" "}
            <span className="bg-linear-to-r from-[#008cff] to-[#007bff] bg-clip-text text-transparent">
              {t("missionText")}
            </span>{" "}
            {t("separator")}{" "}
            <span className="bg-linear-to-r from-[#00c98d] to-[#00e79a] bg-clip-text text-transparent">
              {t("visionText")}
            </span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-[#9aa7b7]">
            {t("description")}
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {cardsData.map((card) => (
            <MissionCard
              key={card.titleKey}
              data={card}
              title={t(card.titleKey)}
              description={t(card.descKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

// =========================================================
// SUB COMPONENTS
// =========================================================

function MissionCard({
  data,
  title,
  description,
}: {
  data: CardData;
  title: string;
  description: string;
}) {
  const v = variantStyles[data.variant];
  const Icon = data.icon;

  return (
    <div
      className={`group relative min-h-42.5 overflow-hidden rounded-2xl border ${v.border} ${v.bg} p-6 transition-colors`}
    >
      {/* Dot Pattern */}
      <DotPattern color={v.dotColor} />

      <div className="relative z-10 flex items-start gap-5">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${v.iconBg} ${v.iconText} shadow-[inset_0_0_20px_rgba(0,140,255,0.05)]`}
        >
          <Icon size={27} strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="pt-1">
          <h3 className="text-base font-semibold tracking-[-0.01em] sm:text-lg">
            {title}
          </h3>
          <p className="mt-4 max-w-110 text-[13px] leading-6 text-slate-500 dark:text-[#a4afbd]">
            {description}
          </p>
        </div>
      </div>
    </div>
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
