"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Custom event dispatched whenever theme changes (so useSyncExternalStore re-renders)
const THEME_EVENT = "theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback); // cross-tab sync
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useSyncExternalStore reads from localStorage without setState-in-effect
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Apply theme class to <html> — this is a legitimate DOM sync effect
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
