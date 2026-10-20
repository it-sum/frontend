"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import {
  DARK_THEME_CLASS,
  DEFAULT_THEME,
  isTheme,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  THEMES,
  type Theme,
} from "@/src/constants/variables";

export type { Theme } from "@/src/constants/variables";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

let volatileTheme: Theme = DEFAULT_THEME;
let hasReadStoredTheme = false;

function subscribe(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;

    volatileTheme = isTheme(event.newValue) ? event.newValue : DEFAULT_THEME;
    hasReadStoredTheme = true;
    callback();
  };

  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Theme {
  if (hasReadStoredTheme) return volatileTheme;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    volatileTheme = isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    // Keep the default in-memory theme when browser storage is unavailable.
  }

  hasReadStoredTheme = true;
  return volatileTheme;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(DARK_THEME_CLASS, theme === THEMES.DARK);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    volatileTheme = next;
    hasReadStoredTheme = true;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // The in-memory theme still updates when browser storage is unavailable.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
