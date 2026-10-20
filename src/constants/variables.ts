export const LOCALES = {
  ARABIC: "ar",
  ENGLISH: "en",
} as const;

export const SUPPORTED_LOCALES = [LOCALES.ARABIC, LOCALES.ENGLISH] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = LOCALES.ARABIC;

export const APP_ROUTES = {
  HOME: "/",
  RESOURCES: "/resources",
  DEPARTMENTS: "/departments",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  STUDENT: {
    SUBJECTS: "/student/subjects",
    VIDEOS: "/student/videos",
    SUMMARIES: "/student/summaries",
    SHEETS: "/student/sheets",
    ASSIGNMENTS: "/student/assignments",
    QUIZZES: "/student/quizzes",
    MIDTERM: "/student/midterm",
    FINAL: "/student/final",
    LEADERBOARD: "/student/leaderboard",
    AI: "/student/ai",
    PROFILE: "/student/profile",
    NOTIFICATIONS: "/student/notifications",
    SETTINGS: "/student/settings",
  },
} as const;

export type PublicRoute =
  | typeof APP_ROUTES.HOME
  | typeof APP_ROUTES.RESOURCES
  | typeof APP_ROUTES.DEPARTMENTS
  | typeof APP_ROUTES.ABOUT
  | typeof APP_ROUTES.CONTACT
  | typeof APP_ROUTES.LOGIN;

export type StudentRoute =
  (typeof APP_ROUTES.STUDENT)[keyof typeof APP_ROUTES.STUDENT];
export type DashboardShellRoute =
  | typeof APP_ROUTES.DASHBOARD
  | typeof APP_ROUTES.ADMIN
  | StudentRoute;

export const RESOURCES_SECTION_CONTAINER_CLASSES =
  "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24";

export const VISUAL_ACCENT_COLORS = {
  BLUE: "var(--visual-accent-blue)",
  GREEN: "var(--visual-accent-green)",
  BLUE_HIGHLIGHT: "var(--visual-accent-blue-highlight)",
  GREEN_HIGHLIGHT: "var(--visual-accent-green-highlight)",
} as const;

export const PUBLIC_BRAND_CLASSES = {
  wordmark: "text-public-brand-blue dark:text-public-brand-cyan",
  primaryGradient: "bg-linear-to-r from-public-brand-cyan to-public-brand-blue",
  primaryGradientHover:
    "hover:from-public-brand-cyan-hover hover:to-public-brand-blue-hover",
  activeNavigation:
    "bg-public-brand-cyan/10 text-public-brand-blue dark:bg-public-brand-cyan/12 dark:text-cyan-400",
} as const;

export const SHELL_ICON_BUTTON_BASE_CLASSES =
  "grid h-10 w-10 shrink-0 place-items-center rounded-shell-outer border-0 shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand";

export const LANGUAGE_TOGGLE_CLASSES = {
  size: "h-10 w-14 shrink-0",
  button:
    "h-10 w-14 shrink-0 inline-flex items-center justify-center gap-1.5 rounded-shell-outer border-0 bg-transparent px-2 text-xs font-semibold text-shell-muted shadow-none transition-colors hover:bg-shell-hover hover:text-shell-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand",
  placeholder: "h-10 w-14 shrink-0 rounded-shell-outer",
} as const;

export function isArabicLocale(locale: string): boolean {
  return locale === LOCALES.ARABIC;
}

export function getLocaleDirection(locale: string): "rtl" | "ltr" {
  return isArabicLocale(locale) ? "rtl" : "ltr";
}

export function getNextLocale(locale: string): AppLocale {
  return locale === LOCALES.ENGLISH ? LOCALES.ARABIC : LOCALES.ENGLISH;
}

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];
export const DEFAULT_THEME: Theme = THEMES.LIGHT;
export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "it-sum:theme-change";
export const DARK_THEME_CLASS = "dark";

export function isTheme(value: string | null): value is Theme {
  return value === THEMES.LIGHT || value === THEMES.DARK;
}

export const THEME_BOOTSTRAP_SCRIPT = `
  (function () {
    var darkClass = ${JSON.stringify(DARK_THEME_CLASS)};
    var lightTheme = ${JSON.stringify(THEMES.LIGHT)};
    var darkTheme = ${JSON.stringify(THEMES.DARK)};
    var defaultTheme = ${JSON.stringify(DEFAULT_THEME)};

    try {
      var storedTheme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
      var theme = storedTheme === lightTheme || storedTheme === darkTheme
        ? storedTheme
        : defaultTheme;
      document.documentElement.classList.toggle(darkClass, theme === darkTheme);
    } catch {
      document.documentElement.classList.toggle(
        darkClass,
        defaultTheme === darkTheme,
      );
    }
  })();
`.trim();
