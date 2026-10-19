"use client";

import { useTheme } from "@/src/components/providers/theme-provider";
import { useMounted } from "@/src/hooks/use-mounted";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");
  const isMounted = useMounted();

  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={t("toggleTheme", {
        theme: theme === "dark" ? t("lightTheme") : t("darkTheme"),
      })}
      className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5" />
      ) : (
        <Moon className="w-4.5 h-4.5" />
      )}
    </button>
  );
}
