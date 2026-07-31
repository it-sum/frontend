"use client";

import { BookOpen, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuthGuard } from "@/src/hooks/use-auth-guard";
import { useAuthStore } from "@/src/stores/auth.store";
import { logout } from "@/src/services/auth.service";

export default function StudentDashboardPage() {
  const locale = useLocale();
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

  // Show a loading skeleton while the session is being restored.
  if (isRestoring || !user) {
    return (
      <div className="flex h-dvh items-center justify-center bg-slate-50 dark:bg-[#020817]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500 dark:border-slate-700 dark:border-t-cyan-400" />
      </div>
    );
  }

  const fullName = user.studentProfile?.fullName ?? user.email;

  return (
    <div className="min-h-dvh bg-slate-50 dark:bg-[#020817]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-white/5 dark:bg-[#020817]/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-400/10">
              <BookOpen
                className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              IT-SUM
            </span>
          </div>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Welcome */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white/80 p-8 backdrop-blur dark:border-white/5 dark:bg-white/2">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400">
              <User className="h-7 w-7 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Student Dashboard
              </p>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Welcome back, {fullName}
              </h1>
              {user.studentProfile && (
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Student ID: {user.studentProfile.studentCode}
                  {user.studentProfile.academicYear
                    ? ` · Year ${user.studentProfile.academicYear}`
                    : ""}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Placeholder content grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "My Subjects", icon: BookOpen, color: "text-sky-500" },
            { label: "Summaries", icon: BookOpen, color: "text-cyan-500" },
            { label: "Quizzes", icon: BookOpen, color: "text-emerald-500" },
          ].map(({ label, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 backdrop-blur dark:border-white/5 dark:bg-white/2"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 dark:border-white/5 dark:bg-white/3">
                <Icon className={`h-5 w-5 ${color}`} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
