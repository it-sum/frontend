import {
  Award,
  Bell,
  BookOpen,
  CircleHelp,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Sparkles,
  Trophy,
  UserRound,
  Video,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { DashboardNavigationItem } from "@/src/components/dashboard/dashboard-app-shell";
import { APP_ROUTES } from "@/src/constants/variables";

const studentNavigation = [
  { key: "dashboard", href: APP_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { key: "subjects", href: APP_ROUTES.STUDENT.SUBJECTS, icon: BookOpen },
  { key: "videos", href: APP_ROUTES.STUDENT.VIDEOS, icon: Video },
  { key: "summaries", href: APP_ROUTES.STUDENT.SUMMARIES, icon: FileText },
  { key: "sheets", href: APP_ROUTES.STUDENT.SHEETS, icon: FileSpreadsheet },
  {
    key: "assignments",
    href: APP_ROUTES.STUDENT.ASSIGNMENTS,
    icon: ClipboardList,
  },
  { key: "quizzes", href: APP_ROUTES.STUDENT.QUIZZES, icon: CircleHelp },
  { key: "midterm", href: APP_ROUTES.STUDENT.MIDTERM, icon: GraduationCap },
  { key: "final", href: APP_ROUTES.STUDENT.FINAL, icon: Award },
  {
    key: "leaderboard",
    href: APP_ROUTES.STUDENT.LEADERBOARD,
    icon: Trophy,
  },
  { key: "ai", href: APP_ROUTES.STUDENT.AI, icon: Sparkles },
  { key: "profile", href: APP_ROUTES.STUDENT.PROFILE, icon: UserRound },
  {
    key: "notifications",
    href: APP_ROUTES.STUDENT.NOTIFICATIONS,
    icon: Bell,
  },
  { key: "settings", href: APP_ROUTES.STUDENT.SETTINGS, icon: Settings },
] as const satisfies ReadonlyArray<{
  key: string;
  href: DashboardNavigationItem["href"];
  icon: DashboardNavigationItem["icon"];
}>;

export function useStudentShellNavigation() {
  const t = useTranslations("StudentShell");
  const items: DashboardNavigationItem[] = studentNavigation.map(
    ({ key, href, icon }) => ({
      href,
      icon,
      label: t(`items.${key}`),
    }),
  );

  return {
    primaryItems: items.slice(0, 4),
    secondaryItems: items.slice(4, 12),
    bottomItems: items.slice(12),
  };
}
