"use client";

import { Info, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  StudentCard,
  StudentDataState,
  StudentPageContainer,
  StudentPageHeader,
} from "@/src/components/student/student-page-primitives";
import { useAuthStore } from "@/src/stores/auth.store";

export default function StudentProfilePage() {
  const t = useTranslations("StudentFeaturePages.profile");
  const user = useAuthStore((state) => state.user);
  const isRestoring = useAuthStore((state) => state.isRestoring);

  const fields: Array<{ label: string; value: string }> = [];
  if (user?.studentProfile?.fullName) {
    fields.push({
      label: t("fields.fullName"),
      value: user.studentProfile.fullName,
    });
  }
  if (user?.studentProfile?.studentCode) {
    fields.push({
      label: t("fields.studentCode"),
      value: user.studentProfile.studentCode,
    });
  }
  if (user?.studentProfile?.academicYear != null) {
    fields.push({
      label: t("fields.academicYear"),
      value: String(user.studentProfile.academicYear),
    });
  }
  if (user?.email) {
    fields.push({ label: t("fields.email"), value: user.email });
  }
  if (user?.status) {
    fields.push({
      label: t("fields.status"),
      value: t(`status.${user.status}`),
    });
  }

  return (
    <StudentPageContainer>
      <StudentPageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <StudentCard
        title={t("primaryTitle")}
        icon={UserRound}
      >
        {fields.length > 0 ? (
          <dl className="divide-y divide-slate-100 dark:divide-white/10">
            {fields.map(({ label, value }) => (
              <div
                key={label}
                className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(10rem,0.7fr)_1fr] sm:gap-4"
              >
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  {label}
                </dt>
                <dd className="break-words text-sm font-medium text-slate-900 dark:text-slate-100">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <StudentDataState
            state={isRestoring ? "loading" : "unavailable"}
            message={isRestoring ? t("loading") : t("unavailable")}
            icon={Info}
            className="rounded-2xl border border-slate-200/60 bg-[#F8FAFC] p-5 text-sm leading-6 text-shell-muted dark:border-slate-800 dark:bg-[#162428]"
          />
        )}
      </StudentCard>
    </StudentPageContainer>
  );
}
