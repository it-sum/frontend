"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { Users, Code2, Target, Server, Boxes } from "lucide-react";

import seif from "@/src/assets/images/team/seif.webp";
import ahmed from "@/src/assets/images/team/ahmed.webp";

// =========================================================
// ICONS (Custom SVGs for brand consistency)
// =========================================================
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07s.92-2.07 2.06-2.07c1.14 0 2.06.93 2.06 2.07s-.92 2.07-2.06 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

// =========================================================
// VARIANTS CONFIG (Clean Styling Logic)
// =========================================================
const variants = {
  blue: {
    article:
      "border-blue-500/30 dark:bg-[linear-gradient(115deg,#031222_0%,#04101d_55%,#03101c_100%)]",
    circle: "border-blue-500 bg-blue-500/10",
    glow: "bg-blue-500/10",
    role: "border-blue-500/20 bg-blue-500/15 text-blue-500",
    skill: "border-blue-500/15 bg-blue-500/7 text-blue-500",
    dotColor: "#008cff",
    dotPosition: "end-3" as const,
    mask: "to bottom left",
  },
  green: {
    article:
      "border-emerald-500/30 dark:bg-[linear-gradient(115deg,#03191a_0%,#04131b_55%,#03101a_100%)]",
    circle: "border-emerald-500 bg-emerald-500/10",
    glow: "bg-emerald-500/10",
    role: "border-emerald-500/20 bg-emerald-500/15 text-emerald-500",
    skill: "border-emerald-500/15 bg-emerald-500/7 text-emerald-500",
    dotColor: "#00d98b",
    dotPosition: "start-3" as const,
    mask: "to bottom right",
  },
};

const Team = () => {
  const t = useTranslations("Team");

  const seifSkills = [
    { label: t("seif.skills.fullStack"), icon: <Code2 size={14} /> },
    { label: t("seif.skills.softwareEngineering"), icon: <Target size={14} /> },
  ];

  const ahmedSkills = [
    { label: t("ahmed.skills.aiEngineering"), icon: <Server size={14} /> },
    { label: t("ahmed.skills.promptEngineering"), icon: <Boxes size={14} /> },
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/6 px-4 py-1.5">
            <Users size={15} className="text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-500">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[42px]">
            {t("title")}{" "}
            <span className="bg-linear-to-r from-[#008cff] via-[#00b9df] to-[#00df8d] bg-clip-text text-transparent">
              IT-SUM
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-500 sm:text-base dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        {/* TEAM CARDS GRID */}
        <div className="mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {/* SEIF */}
          <TeamCard
            variant="blue"
            image={seif}
            name="Seif Ayman"
            role={t("seif.role")}
            description={t("seif.description")}
            skills={seifSkills}
            githubUrl="https://github.com/TheSeifDev"
            githubHandle="@TheSeifDev"
            linkedinUrl="https://www.linkedin.com/in/theseifdev"
            linkedinHandle="@TheSeifDev"
          />

          {/* AHMED */}
          <TeamCard
            variant="green"
            image={ahmed}
            name="Ahmed"
            role={t("ahmed.role")}
            description={t("ahmed.description")}
            skills={ahmedSkills}
            githubUrl="https://github.com/alf-2006"
            githubHandle="@alf-2006"
            linkedinUrl="#"
            linkedinHandle="@alf-2006"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;

// =========================================================
// TEAM CARD COMPONENT
// =========================================================
type TeamCardProps = {
  variant: "blue" | "green";
  image: StaticImageData;
  name: string;
  role: string;
  description: string;
  skills: { label: string; icon: React.ReactNode }[];
  githubUrl: string;
  githubHandle: string;
  linkedinUrl: string;
  linkedinHandle: string;
};

function TeamCard({
  variant,
  image,
  name,
  role,
  description,
  skills,
  githubUrl,
  githubHandle,
  linkedinUrl,
  linkedinHandle,
}: TeamCardProps) {
  const v = variants[variant];

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border bg-white p-5 dark:bg-[#04101d] ${v.article}`}
    >
      {/* Decorative dots */}
      <div
        className={`pointer-events-none absolute top-4 ${v.dotPosition} h-20 w-24 opacity-30`}
        style={{
          backgroundImage: `radial-gradient(circle, ${v.dotColor} 1px, transparent 1px)`,
          backgroundSize: "11px 11px",
          maskImage: `linear-gradient(${v.mask}, black, transparent 85%)`,
          WebkitMaskImage: `linear-gradient(${v.mask}, black, transparent 85%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center gap-5 sm:flex-row">
        {/* PHOTO SECTION - Smaller 1:1 Aspect Ratio */}
        <div className="relative shrink-0">
          <div
            className={`relative aspect-square w-32 overflow-hidden rounded-full border sm:w-40 ${v.circle}`}
          >
            <div
              className={`absolute inset-3 rounded-full blur-2xl ${v.glow}`}
            />
            <Image
              src={image}
              alt={name}
              fill
              sizes="160px"
              className="relative z-10 object-cover object-center"
            />
          </div>

          {/* LinkedIn floating icon */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} LinkedIn`}
            className="absolute bottom-1 inset-e-1 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a7cff] text-white shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:scale-105"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>

        {/* INFORMATION SECTION - Tighter Spacing */}
        <div className="flex min-w-0 flex-1 flex-col text-center sm:text-start">
          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
            {name}
          </h3>

          <div className="mt-2">
            <span
              className={`inline-flex rounded-md border px-3 py-1 text-xs font-semibold ${v.role}`}
            >
              {role}
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-[13px] sm:leading-6 dark:text-[#aab4c1]">
            {description}
          </p>

          <div className="my-3 h-px w-full bg-slate-200 dark:bg-white/6" />

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${v.skill}`}
              >
                {skill.icon}
                {skill.label}
              </div>
            ))}
          </div>

          {/* Socials - Modern Pill Buttons with Text */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <SocialLink href={githubUrl} label={githubHandle}>
              <GithubIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href={linkedinUrl} label={linkedinHandle}>
              <LinkedinIcon className="h-4 w-4 text-[#0a7cff]" />
            </SocialLink>
          </div>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// SOCIAL LINK COMPONENT (Modern Pill Style)
// =========================================================
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-slate-100 dark:border-white/8 dark:bg-[#071522] dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-[#0d1c2e]"
    >
      {children}
      <span>{label}</span>
    </a>
  );
}
