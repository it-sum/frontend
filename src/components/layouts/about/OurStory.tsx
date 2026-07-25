import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const timelineConfig = [
  {
    year: "2025",
    dotColor: "#3b82f6",
    yearColor: "#3b82f6",
    yearBorder: "rgba(59,130,246,0.4)",
    yearBg: "rgba(59,130,246,0.08)",
    titleKey: "items.0.title",
    descKey: "items.0.desc",
    divider: true,
    lineStyle: "solid" as const,
  },
  {
    year: "2025",
    dotColor: "#2dd4bf",
    yearColor: "#2dd4bf",
    yearBorder: "rgba(45,212,191,0.4)",
    yearBg: "rgba(45,212,191,0.08)",
    titleKey: "items.1.title",
    descKey: "items.1.desc",
    divider: true,
    lineStyle: "solid" as const,
  },
  {
    year: "2026",
    dotColor: "#84cc16",
    yearColor: "#84cc16",
    yearBorder: "rgba(132,204,22,0.4)",
    yearBg: "rgba(132,204,22,0.08)",
    titleKey: "items.2.title",
    descKey: "items.2.desc",
    divider: false,
    lineStyle: "solid" as const,
  },
];

const YEAR_COL_WIDTH = 76;
const DOT_COL_WIDTH = 24;
const DOT_TOP_OFFSET = 6;
const DOT_SIZE = 16;
const DOT_CENTER = DOT_TOP_OFFSET + DOT_SIZE / 2;

type TimelineRowProps = {
  children: React.ReactNode[];
  lineColor: string;
  lineStyle?: "solid" | "dashed";
  trimLineTop?: boolean;
  trimLineBottom?: boolean;
};

const TimelineRow = ({
  children,
  lineColor,
  lineStyle = "solid",
  trimLineTop = false,
  trimLineBottom = false,
}: TimelineRowProps) => {
  const lineTop = trimLineTop ? `${DOT_CENTER}px` : 0;
  const lineBottom = trimLineBottom ? `calc(100% - ${DOT_CENTER}px)` : 0;

  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      {}
      <div style={{ width: YEAR_COL_WIDTH, flexShrink: 0 }}>{children[0]}</div>

      {}
      <div
        style={{ width: DOT_COL_WIDTH, flexShrink: 0, position: "relative" }}
      >
        {lineStyle === "solid" ? (
          <div
            style={{
              position: "absolute",
              top: lineTop,
              bottom: lineBottom,
              left: "50%",
              width: "2px",
              transform: "translateX(-50%)",
              background: lineColor,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: lineTop,
              bottom: lineBottom,
              left: "50%",
              borderLeft: `2px dashed ${lineColor}`,
              transform: "translateX(-50%)",
            }}
          />
        )}
        {children[1]}
      </div>

      {}
      <div style={{ flex: 1, paddingInlineStart: 24, minWidth: 0 }}>
        {children[2]}
      </div>
    </div>
  );
};

type DotProps = {
  color: string;
  open?: boolean;
};

const Dot = ({ color, open = false }: DotProps) => (
  <div
    style={{
      position: "absolute",
      top: DOT_TOP_OFFSET,
      left: "50%",
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: open ? "50%" : 3,
      transform: open ? "translateX(-50%)" : "translateX(-50%) rotate(45deg)",
      background: open ? "transparent" : color,
      border: open ? `2px solid ${color}` : "none",
      boxShadow: open ? "none" : `0 0 6px 0 ${color}`,
    }}
  />
);

type YearBadgeProps = {
  label: string;
  color: string;
  border: string;
  bg: string;
};

const YearBadge = ({ label, color, border, bg }: YearBadgeProps) => (
  <div
    style={{
      display: "inline-block",
      minWidth: 60,
      textAlign: "center",
      padding: "6px 10px",
      borderRadius: 8,
      border: `1px solid ${border}`,
      background: bg,
      color,
      fontWeight: 700,
      fontSize: 14,
    }}
  >
    {label}
  </div>
);

const OurStory = () => {
  const t = useTranslations("OurStory");

  return (
    <div className="w-full flex justify-center my-4 mb-16 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-305">
        <section className="relative overflow-hidden rounded-[22px] border border-blue-500/20 bg-linear-to-br from-blue-500/6 via-white to-blue-500/3 shadow-2xl shadow-blue-950/10 p-8 sm:p-12 lg:p-16 font-sans text-slate-800 dark:from-[#06172a] dark:via-[#061321] dark:to-[#05203b] dark:text-slate-200 dark:shadow-black/30 dark:border-blue-500/20 transition-colors">
          {}
          <DotPattern
            color="#008cff"
            className="top-0 right-0"
            maskDirection="to bottom left"
          />
          <DotPattern
            color="#00d98b"
            className="bottom-0 left-0"
            maskDirection="to top right"
          />

          <div
            className="grid gap-10 lg:gap-16"
            style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)" }}
          >
            {}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-[13px] font-bold tracking-[0.14em] text-blue-500 dark:text-blue-400">
                  {t("badge")}
                </span>
                <div className="mt-2.5 h-0.75 w-8 rounded-sm bg-linear-to-r from-blue-500 to-green-500" />
              </div>

              <h2 className="m-0 text-4xl font-extrabold leading-[1.15] text-slate-900 dark:text-white sm:text-[44px]">
                {t("title")}
                <br />
                <span className="bg-linear-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  {t("titleHighlight")}
                </span>
              </h2>

              <p className="mt-7 max-w-105 text-base leading-[1.7] text-slate-500 dark:text-slate-400">
                {t("description1")}
              </p>

              <div className="my-7 h-px w-full max-w-90 bg-slate-200 dark:bg-white/10" />

              <p className="max-w-105 text-base leading-[1.7] text-slate-500 dark:text-slate-400">
                {t("description2")}
              </p>
            </div>

            {}
            <div className="flex flex-col">
              {timelineConfig.map((item, idx) => (
                <TimelineRow
                  key={idx}
                  lineColor={item.dotColor}
                  lineStyle={item.lineStyle}
                  trimLineTop={idx === 0}
                >
                  {[
                    <YearBadge
                      key="year"
                      label={item.year}
                      color={item.yearColor}
                      border={item.yearBorder}
                      bg={item.yearBg}
                    />,
                    <Dot key="dot" color={item.dotColor} />,
                    <div
                      key="content"
                      style={{
                        paddingBottom:
                          idx === timelineConfig.length - 1
                            ? 40
                            : item.divider
                              ? 28
                              : 0,
                      }}
                    >
                      <h3 className="m-0 mb-2 text-xl font-bold text-slate-900 dark:text-white">
                        {t(item.titleKey)}
                      </h3>
                      <p className="m-0 text-[15px] leading-[1.7] text-slate-500 dark:text-slate-400">
                        {t(item.descKey)}
                      </p>
                      {item.divider && (
                        <div className="mt-6 h-px w-full bg-slate-200 dark:bg-white/10" />
                      )}
                    </div>,
                  ]}
                </TimelineRow>
              ))}

              {}
              <TimelineRow
                lineColor="rgba(132,204,22,0.6)"
                lineStyle="dashed"
                trimLineBottom
              >
                {[
                  <div key="empty" />,
                  <Dot key="dot-open" color="#84cc16" open />,
                  <div key="future" style={{ paddingTop: 2 }}>
                    <div className="flex items-center gap-1.5 text-lg font-bold text-lime-500">
                      {t("future.title")}{" "}
                      <ArrowRight className="size-4 rtl:rotate-180" />
                    </div>
                    <p className="mt-1.5 text-[15px] text-slate-500 dark:text-slate-400">
                      {t("future.desc")}
                    </p>
                  </div>,
                ]}
              </TimelineRow>
            </div>
          </div>
        </section>

        {}
        <div className="pointer-events-none absolute right-[10%] -bottom-7.5 left-[10%] h-16 bg-cyan-500/10 blur-[70px]"></div>
      </div>
    </div>
  );
};

export default OurStory;

function DotPattern({
  color,
  className,
  maskDirection,
}: {
  color: string;
  className: string;
  maskDirection: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute h-24 w-28 opacity-35 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "10px 10px",
        maskImage: `linear-gradient(${maskDirection}, black 0%, transparent 75%)`,
        WebkitMaskImage: `linear-gradient(${maskDirection}, black 0%, transparent 75%)`,
      }}
    />
  );
}
