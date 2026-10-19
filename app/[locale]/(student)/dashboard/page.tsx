"use client";

import {
  ArrowUpRight,
  BookOpen,
  Building2,
  LogOut,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { useAuthGuard } from "@/src/hooks/use-auth-guard";
import { useAuthStore } from "@/src/stores/auth.store";
import { logout } from "@/src/services/auth.service";

export default function StudentDashboardPage() {
  const locale = useLocale();
  const t = useTranslations("StudentDashboard");
  const router = useRouter();
  const { clearSession } = useAuthStore();
  const { user, isRestoring } = useAuthGuard("student");

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearSession();
      router.replace(`/${locale}/login`);
    }
  };

  if (isRestoring || !user) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-slate-50 dark:bg-[#020817]"
        role="status"
        aria-label={t("loading")}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />
      </div>
    );
  }

  const fullName = user.studentProfile?.fullName ?? user.email;

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-dvh bg-slate-50 dark:bg-[#020817]"
    >
      <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-white/5 dark:bg-[#020817]/90 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-400/10">
              <BookOpen
                className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                strokeWidth={1.5}
              />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              IT-SUM
            </span>
          </Link>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            {t("signOut")}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur dark:border-white/5 dark:bg-white/2 sm:p-8">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 via-cyan-400 to-emerald-400">
              <UserRound
                aria-hidden="true"
                className="h-7 w-7 text-white"
                strokeWidth={1.5}
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("dashboardLabel")}
              </p>
              <h1 className="mt-1 break-words text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                {t("welcome", { name: fullName })}
              </h1>
              {user.studentProfile && (
                <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
                  {t("studentId", { id: user.studentProfile.studentCode })}
                  {user.studentProfile.academicYear
                    ? ` · ${t("academicYear", { year: user.studentProfile.academicYear })}`
                    : ""}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="dashboard-quick-links">
          <h2
            id="dashboard-quick-links"
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            {t("quickAccess")}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <DashboardLink
              href="/resources"
              icon={BookOpen}
              title={t("resources.title")}
              description={t("resources.description")}
            />
            <DashboardLink
              href="/departments"
              icon={Building2}
              title={t("departments.title")}
              description={t("departments.description")}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function DashboardLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: "/resources" | "/departments";
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-24 items-center gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 transition-colors hover:border-cyan-400/50 hover:bg-cyan-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:border-white/8 dark:bg-white/2 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-400/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-180"
      />
    </Link>
  );
}
