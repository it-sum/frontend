"use client";

import { LogOut, Settings, ShieldCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuthGuard } from "@/src/hooks/use-auth-guard";
import { useAuthStore } from "@/src/stores/auth.store";
import { logout } from "@/src/services/auth.service";

export default function AdminDashboardPage() {
  const t = useTranslations("AdminDashboard");
  const locale = useLocale();
  const router = useRouter();
  const { accessToken, clearSession } = useAuthStore();
  const { user, isRestoring } = useAuthGuard("admin");

  const handleLogout = async () => {
    try {
      await logout(accessToken);
    } finally {
      clearSession();
      router.replace(`/${locale}/login`);
    }
  };

  if (isRestoring || !user) {
    return (
      <div
        role="status"
        aria-label={t("restoringSession")}
        className="grid min-h-[50vh] place-items-center"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-shell-border border-t-shell-brand" />
      </div>
    );
  }

  const overviewItems = [
    { label: t("manageUsers"), icon: Users },
    { label: t("settings"), icon: Settings },
    { label: t("security"), icon: ShieldCheck },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 text-sm font-semibold text-shell-brand">
            {t("eyebrow")}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-shell-foreground sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-shell-muted">
            {t("description")}
          </p>
        </div>

        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-shell-border bg-shell-surface px-4 text-sm font-semibold text-shell-foreground transition-colors hover:border-shell-brand/30 hover:bg-shell-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand"
        >
          <LogOut aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          {t("signOut")}
        </button>
      </header>

      <section className="mb-6 flex flex-wrap items-center gap-4 rounded-3xl border border-shell-border bg-shell-surface p-5 shadow-sm sm:p-7">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-shell-brand/10 text-shell-brand">
          <ShieldCheck
            aria-hidden="true"
            className="h-7 w-7"
            strokeWidth={1.7}
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-shell-muted">
            {t("eyebrow")}
          </p>
          <h2 className="mt-1 break-all text-base font-semibold text-shell-foreground sm:text-lg">
            {user.email}
          </h2>
          <p className="mt-1 text-sm text-shell-muted">
            {t("roleDescription")}
          </p>
        </div>
      </section>

      <section
        aria-label={t("overview")}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {overviewItems.map(({ label, icon: Icon }) => (
          <article
            key={label}
            className="flex min-h-24 items-center gap-4 rounded-2xl border border-shell-border bg-shell-surface p-5 shadow-shell-card"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-shell-hover text-shell-brand">
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <h2 className="text-sm font-semibold text-shell-foreground">
              {label}
            </h2>
          </article>
        ))}
      </section>
    </div>
  );
}
