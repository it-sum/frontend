import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BookOpen, ClipboardList, FileSpreadsheet, FileText, Play } from "lucide-react";
import {
  StudentCard,
  StudentEmptyStateBox,
  StudentPageContainer,
  StudentPageHeader,
} from "@/src/components/student/student-page-primitives";

export type StudentContentPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryTitle: string;
  primaryDescription: string;
  primaryState: string;
  secondaryTitle: string;
  secondaryDescription: string;
  secondaryState: string;
};

const pageIcons: Record<string, LucideIcon> = {
  subjects: BookOpen,
  videos: Play,
  summaries: FileText,
  sheets: FileSpreadsheet,
  assignments: ClipboardList,
  subjectDetails: BookOpen,
};

export function StudentContentPage({
  kind,
  copy,
  children,
}: {
  kind: keyof typeof pageIcons;
  copy: StudentContentPageCopy;
  children?: ReactNode;
}) {
  const Icon = pageIcons[kind];

  return (
    <StudentPageContainer>
      <StudentPageHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />
      {children}
      <StudentCard title={copy.primaryTitle}>
        <StudentEmptyStateBox
          icon={Icon}
          title={copy.primaryState}
          description={copy.primaryDescription}
        />
      </StudentCard>
    </StudentPageContainer>
  );
}
