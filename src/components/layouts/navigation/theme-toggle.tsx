"use client";

import { useTheme } from "@/src/components/providers/theme-provider";
import {
  SHELL_ICON_BUTTON_BASE_CLASSES,
  THEMES,
} from "@/src/constants/variables";
import { useMounted } from "@/src/hooks/use-mounted";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import styles from "./theme-toggle.module.css";

export default function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "circular";
} = {}) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <span
        aria-hidden="true"
        className={
          variant === "circular"
            ? "h-10 w-10 rounded-shell-outer"
            : styles.placeholder
        }
      />
    );
  }

  const nextTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  const accessibleLabel = t("toggleTheme", {
    theme: t(nextTheme === THEMES.LIGHT ? "lightTheme" : "darkTheme"),
  });
  const ThemeIcon = theme === THEMES.DARK ? Moon : Sun;

  return (
    <button
      type="button"
      className={
        variant === "circular"
          ? `${SHELL_ICON_BUTTON_BASE_CLASSES} cursor-pointer bg-transparent p-0 text-shell-muted hover:bg-shell-hover ${styles.circular}`
          : styles.button
      }
      data-theme={theme}
      onClick={() => setTheme(nextTheme)}
      aria-label={accessibleLabel}
      aria-pressed={theme === THEMES.DARK}
      title={accessibleLabel}
    >
      <ThemeIcon
        aria-hidden="true"
        className={`${styles.icon} ${theme === THEMES.DARK ? styles.moon : styles.sun}`}
      />
    </button>
  );
}
