"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useMounted } from "@/src/hooks/use-mounted";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const pathname = usePathname();
  const isMounted = useMounted();
  const nextLocale = locale === "en" ? "ar" : "en";

  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      aria-label={t("toggleLanguage", { locale: nextLocale.toUpperCase() })}
      className="flex h-11 items-center gap-1.5 rounded-lg px-2 text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
    </button>
  );
}
