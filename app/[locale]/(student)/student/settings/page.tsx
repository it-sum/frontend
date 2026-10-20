import { getTranslations } from "next-intl/server";
import ThemeToggle from "@/src/components/layouts/navigation/theme-toggle";
import LanguageToggle from "@/src/components/layouts/navigation/language-toggle";
import {
  StudentCard,
  StudentDataState,
  StudentPageContainer,
  StudentPageHeader,
} from "@/src/components/student/student-page-primitives";

export default async function StudentSettingsPage() {
  const t = await getTranslations("StudentFeaturePages.settings");

  return (
    <StudentPageContainer width="wide">
      <StudentPageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="grid gap-4 md:grid-cols-6">
        <StudentCard title={t("appearanceTitle")} className="md:col-span-4">
          <div className="divide-y divide-slate-100 dark:divide-white/10">
            <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <div>
                <h3 className="text-sm font-medium">{t("themeTitle")}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {t("themeDescription")}
                </p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
              <div>
                <h3 className="text-sm font-medium">{t("languageTitle")}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {t("languageDescription")}
                </p>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </StudentCard>

        <StudentCard title={t("accountTitle")} className="md:col-span-2">
          <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("accountDescription")}
          </p>
          <StudentDataState
            state="unavailable"
            message={t("accountUnavailable")}
          />
        </StudentCard>
      </div>
    </StudentPageContainer>
  );
}
