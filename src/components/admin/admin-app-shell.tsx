"use client";

import { LayoutDashboard, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DashboardAppShell,
  type DashboardNavigationItem,
} from "@/src/components/dashboard/dashboard-app-shell";
import { APP_ROUTES } from "@/src/constants/variables";
import { useAuthStore } from "@/src/stores/auth.store";

export function AdminAppShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("AdminDashboard");
  const user = useAuthStore((state) => state.user);
  const accountLabel = user?.email ?? t("account");
  const primaryItems: DashboardNavigationItem[] = [
    {
      href: APP_ROUTES.ADMIN,
      icon: LayoutDashboard,
      label: t("overview"),
    },
  ];

  const accountControl = (
    <div
      role="group"
      aria-label={t("accountAccess", { name: accountLabel })}
      title={accountLabel}
      className="flex h-11 max-w-52 shrink-0 items-center gap-2 rounded-full border border-shell-border bg-shell-surface p-1 text-shell-foreground shadow-sm"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-shell-hover text-shell-brand-strong">
        <UserRound aria-hidden="true" className="h-[18px] w-[18px]" />
      </span>
      <span className="hidden truncate pe-2 text-xs font-semibold xl:block">
        {t("account")}
      </span>
    </div>
  );

  const mobileAccountControl = (
    <span
      role="group"
      aria-label={t("accountAccess", { name: accountLabel })}
      title={accountLabel}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-shell-outer border border-shell-border bg-shell-surface text-shell-brand-strong shadow-sm"
    >
      <UserRound aria-hidden="true" className="h-[18px] w-[18px]" />
    </span>
  );

  return (
    <DashboardAppShell
      brandHref={APP_ROUTES.ADMIN}
      primaryItems={primaryItems}
      secondaryItems={[]}
      primaryNavigationLabel={t("primaryNavigation")}
      secondaryNavigationLabel={t("secondaryNavigation")}
      accountControl={accountControl}
      mobileAccountControl={mobileAccountControl}
    >
      {children}
    </DashboardAppShell>
  );
}
