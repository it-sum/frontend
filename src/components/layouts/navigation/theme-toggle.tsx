"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/src/hooks/use-mounted";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-lg dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5" />
      ) : (
        <Moon className="w-4.5 h-4.5" />
      )}
    </button>
  );
}
