"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useMounted } from "@/src/hooks/use-mounted";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const locale = useLocale();
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
      aria-label="Toggle language"
      className="flex items-center gap-1.5 h-9 px-2 rounded-lg dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
    </button>
  );
}
