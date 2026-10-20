import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bell,
  CircleHelp,
  GraduationCap,
  Sparkles,
  Trophy,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  StudentCard,
  StudentEmptyStateBox,
  StudentPageContainer,
  StudentPageHeader,
} from "@/src/components/student/student-page-primitives";

export type StudentFeatureKey =
  "quizzes" | "midterm" | "final" | "leaderboard" | "ai" | "notifications";

const namespaces = {
  quizzes: "StudentFeaturePages.quizzes",
  midterm: "StudentFeaturePages.midterm",
  final: "StudentFeaturePages.final",
  leaderboard: "StudentFeaturePages.leaderboard",
  ai: "StudentFeaturePages.ai",
  notifications: "StudentFeaturePages.notifications",
} satisfies Record<StudentFeatureKey, string>;

const icons: Record<StudentFeatureKey, LucideIcon> = {
  quizzes: CircleHelp,
  midterm: GraduationCap,
  final: Award,
  leaderboard: Trophy,
  ai: Sparkles,
  notifications: Bell,
};

export async function StudentFeaturePage({
  kind,
}: {
  kind: StudentFeatureKey;
}) {
  const t = await getTranslations(namespaces[kind]);
  const Icon = icons[kind];

  return (
    <StudentPageContainer>
      <StudentPageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <StudentCard title={t("primaryTitle")}>
        <StudentEmptyStateBox
          icon={Icon}
          title={t("primaryState")}
          description={t("primaryDescription")}
        />
      </StudentCard>
    </StudentPageContainer>
  );
}
