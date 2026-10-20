"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useMounted } from "@/src/hooks/use-mounted";
import {
  getNextLocale,
  LANGUAGE_TOGGLE_CLASSES,
} from "@/src/constants/variables";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();
  const isMounted = useMounted();
  const nextLocale = getNextLocale(locale);

  if (!isMounted) {
    return (
      <div
        aria-hidden="true"
        className={LANGUAGE_TOGGLE_CLASSES.placeholder}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        router.replace(pathname, { locale: nextLocale, scroll: false })
      }
      aria-label={t("toggleLanguage", { locale: nextLocale.toUpperCase() })}
      title={t("toggleLanguage", { locale: nextLocale.toUpperCase() })}
      className={LANGUAGE_TOGGLE_CLASSES.button}
    >
      <Languages aria-hidden="true" className="h-4 w-4" />
      <span>{locale.toUpperCase()}</span>
    </button>
  );
}
