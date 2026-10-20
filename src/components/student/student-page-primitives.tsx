import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function StudentPageContainer({
  children,
  className = "",
  width = "standard",
}: {
  children: ReactNode;
  className?: string;
  width?: "standard" | "wide" | "narrow" | "profile";
}) {
  const maxWidthClass =
    width === "wide"
      ? "max-w-7xl"
      : width === "narrow"
        ? "max-w-4xl"
        : "max-w-5xl";

  return (
    <div
      className={`mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8 ${maxWidthClass} ${className}`}
    >
      {children}
    </div>
  );
}

export function StudentPageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-shell-brand dark:text-shell-brand-strong">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-shell-brand"
            />
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-shell-muted">
            {description}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}

export type StudentDataState =
  "unavailable" | "empty" | "loading" | "error" | "unauthorized" | "forbidden";
export function StudentDataState({
  state,
  message,
  icon: Icon,
  className,
}: {
  state: StudentDataState;
  message?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  const t = useTranslations("StudentDataState");
  return (
    <div
      role={state === "loading" ? "status" : "note"}
      aria-live={state === "loading" ? "polite" : undefined}
      className={
        className ??
        "rounded-xl border border-dashed border-shell-border bg-shell-hover px-4 py-3 text-sm leading-6 text-shell-muted"
      }
    >
      {Icon ? (
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-shell-brand/10 text-shell-brand dark:text-shell-brand-strong">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span>{message ?? t(state)}</span>
        </span>
      ) : (
        (message ?? t(state))
      )}
    </div>
  );
}

export function StudentEmptyStateBox({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-shell-border bg-shell-hover/40 px-6 py-12 text-center ${className}`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-shell-brand/10 text-shell-brand dark:text-shell-brand-strong">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-shell-foreground">
        {title}
      </h3>
      <p className="mt-1.5 max-w-md text-sm leading-6 text-shell-muted">
        {description}
      </p>
    </div>
  );
}

export function StudentCard({
  title,
  children,
  className = "",
  icon: Icon,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <section
      className={`rounded-3xl border border-shell-border bg-shell-surface p-5 text-shell-foreground shadow-shell-card sm:p-6 ${className}`}
    >
      <h2 className="mb-4 flex items-center gap-3 text-base font-semibold">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-shell-brand/10 text-shell-brand dark:text-shell-brand-strong">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
        )}
        {title}
      </h2>
      {children}
    </section>
  );
}
