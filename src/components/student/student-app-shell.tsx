"use client";

import { UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import { DashboardAppShell } from "@/src/components/dashboard/dashboard-app-shell";
import { useStudentShellNavigation } from "@/src/components/student/student-shell-navigation";
import {
  APP_ROUTES,
  SHELL_ICON_BUTTON_BASE_CLASSES,
} from "@/src/constants/variables";
import { useAuthStore } from "@/src/stores/auth.store";

export function StudentAppShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("StudentShell");
  const pathname = usePathname();
  const profileIsCurrent = pathname === APP_ROUTES.STUDENT.PROFILE;
  const { primaryItems, secondaryItems, bottomItems } = useStudentShellNavigation();
  const user = useAuthStore((state) => state.user);
  const fullName = user?.studentProfile?.fullName || user?.email;
  const academicYear = user?.studentProfile?.academicYear;
  const profileDetails =
    academicYear != null
      ? t("academicYear", { year: academicYear })
      : user?.studentProfile?.fullName
        ? user.email
        : undefined;
  const profileLabel = fullName
    ? t("profileAccess", { name: fullName })
    : t("items.profile");
  const profileTitle = [fullName, profileDetails]
    .filter((value, index, values) => value && values.indexOf(value) === index)
    .join(" · ");

  const accountControl = (
    <Link
      href={APP_ROUTES.STUDENT.PROFILE}
      aria-current={profileIsCurrent ? "page" : undefined}
      aria-label={profileLabel}
      title={profileTitle || t("items.profile")}
      className={`${SHELL_ICON_BUTTON_BASE_CLASSES} ${
        profileIsCurrent
          ? "bg-shell-brand-active text-white shadow-shell-active"
          : "text-slate-600 hover:bg-shell-hover hover:text-shell-brand-hover dark:text-slate-300"
      }`}
    >
      <UserRound aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
    </Link>
  );

  const mobileAccountControl = (
    <Link
      href={APP_ROUTES.STUDENT.PROFILE}
      aria-current={profileIsCurrent ? "page" : undefined}
      aria-label={profileLabel}
      title={profileTitle || t("items.profile")}
      className={`${SHELL_ICON_BUTTON_BASE_CLASSES} ${
        profileIsCurrent
          ? "bg-shell-brand-active text-white"
          : "text-slate-600 hover:bg-shell-hover dark:text-slate-300"
      }`}
    >
      <UserRound aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
    </Link>
  );

  return (
    <DashboardAppShell
      brandHref={APP_ROUTES.DASHBOARD}
      primaryItems={primaryItems}
      secondaryItems={secondaryItems}
      bottomItems={bottomItems}
      primaryNavigationLabel={t("primaryNavigation")}
      secondaryNavigationLabel={t("secondaryNavigation")}
      accountControl={accountControl}
      mobileAccountControl={mobileAccountControl}
    >
      {children}
    </DashboardAppShell>
  );
}
