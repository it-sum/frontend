import { getTranslations } from "next-intl/server";
import {
  StudentContentPage,
  type StudentContentPageCopy,
} from "@/src/components/student/student-content-page";

export default async function StudentAssignmentsPage() {
  const t = await getTranslations("StudentContentPages.assignments");
  const copy: StudentContentPageCopy = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    description: t("description"),
    primaryTitle: t("primaryTitle"),
    primaryDescription: t("primaryDescription"),
    primaryState: t("primaryState"),
    secondaryTitle: t("secondaryTitle"),
    secondaryDescription: t("secondaryDescription"),
    secondaryState: t("secondaryState"),
  };
  return <StudentContentPage kind="assignments" copy={copy} />;
}
