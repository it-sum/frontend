import { StudentAppShell } from "@/src/components/student/student-app-shell";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentAppShell>{children}</StudentAppShell>;
}
