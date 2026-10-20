"use client";

import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuthGuard } from "@/src/hooks/use-auth-guard";
import { useAuthStore } from "@/src/stores/auth.store";
import { logout } from "@/src/services/auth.service";
import {
  StudentCard,
  StudentPageHeader,
  StudentPageContainer,
} from "@/src/components/student/student-page-primitives";

export default function StudentDashboardPage() {
  const locale = useLocale();
  const t = useTranslations("StudentDashboard");
  const router = useRouter();
  const { accessToken, clearSession } = useAuthStore();
  const { user, isRestoring } = useAuthGuard("student");

  const handleLogout = async () => {
    try {
      await logout(accessToken);
    } finally {
      clearSession();
      router.replace(`/${locale}/login`);
    }
  };

  if (isRestoring || !user)
    return (
      <div
        className="flex min-h-[70vh] items-center justify-center px-4"
        role="status"
        aria-label={t("loading")}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-shell-border border-t-shell-brand" />
      </div>
    );

  const profile = user.studentProfile;
  const fullName = profile?.fullName ?? user.email;
  return (
    <StudentPageContainer width="wide">
      <StudentPageHeader
        eyebrow={t("dashboardLabel")}
        title={t("welcome", { name: fullName })}
      >
        <button
          id="logout-btn"
          onClick={handleLogout}
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-shell-border bg-shell-surface px-4 text-sm font-semibold text-shell-foreground transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" />
          {t("signOut")}
        </button>
      </StudentPageHeader>

      <div className="grid gap-4 md:grid-cols-5">
        <StudentCard title={t("profileTitle")} className="md:col-span-3">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-shell-brand/10 text-shell-brand-strong">
              <UserRound aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="break-words text-lg font-semibold">{fullName}</p>
              <p className="mt-1 break-words text-sm text-shell-muted">
                {user.email}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile?.studentCode && (
                  <span className="rounded-full bg-shell-hover px-3 py-1 text-xs text-shell-foreground">
                    {t("studentId", { id: profile.studentCode })}
                  </span>
                )}
                {profile?.academicYear != null && (
                  <span className="rounded-full bg-shell-hover px-3 py-1 text-xs text-shell-foreground">
                    {t("academicYear", { year: profile.academicYear })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </StudentCard>
        <StudentCard title={t("workspaceTitle")} className="md:col-span-2">
          <p className="text-sm leading-6 text-shell-muted">
            {t("workspaceUnavailable")}
          </p>
        </StudentCard>
      </div>
    </StudentPageContainer>
  );
}
