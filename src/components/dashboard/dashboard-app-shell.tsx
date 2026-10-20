"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  APP_ROUTES,
  getLocaleDirection,
  type DashboardShellRoute,
} from "@/src/constants/variables";
import { Link, usePathname } from "@/src/i18n/navigation";
import LanguageToggle from "@/src/components/layouts/navigation/language-toggle";
import ThemeToggle from "@/src/components/layouts/navigation/theme-toggle";
import logo from "@/src/assets/images/logo.webp";

export type DashboardShellHref = DashboardShellRoute;

export type DashboardNavigationItem = {
  href: DashboardShellHref;
  label: string;
  icon: LucideIcon;
};

type DashboardAppShellProps = {
  children: React.ReactNode;
  brandHref: typeof APP_ROUTES.DASHBOARD | typeof APP_ROUTES.ADMIN;
  primaryItems: DashboardNavigationItem[];
  secondaryItems: DashboardNavigationItem[];
  bottomItems?: DashboardNavigationItem[];
  primaryNavigationLabel: string;
  secondaryNavigationLabel: string;
  accountControl?: React.ReactNode;
  mobileAccountControl?: React.ReactNode;
};

function DashboardNavigation({
  items,
  label,
  pathname,
  variant = "secondary",
  expanded = false,
  mobile = false,
  onNavigate,
}: {
  items: DashboardNavigationItem[];
  label: string;
  pathname: string;
  variant?: "primary" | "secondary";
  expanded?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [tooltip, setTooltip] = useState<{
    href: DashboardShellHref;
    label: string;
    left: number;
    top: number;
  } | null>(null);

  if (variant === "primary") {
    return (
      <nav
        aria-label={label}
        className="inline-flex w-max min-w-max items-center gap-1 rounded-shell-outer border border-shell-border bg-shell-surface p-1.5 shadow-sm"
      >
        {items.map(({ href, label: itemLabel, icon: Icon }) => {
          const normalizedPath = pathname?.replace(/\/$/, "") || "";
          const normalizedHref = href.replace(/\/$/, "");
          const active =
            normalizedPath === normalizedHref ||
            normalizedPath.startsWith(`${normalizedHref}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand ${
                active
                  ? "bg-shell-brand-active font-semibold text-shell-on-brand shadow-shell-active"
                  : "text-shell-muted hover:bg-shell-hover hover:text-shell-brand-hover"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              <span>{itemLabel}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      <nav dir="ltr" aria-label={label} className="grid gap-1">
        {items.map(({ href, label: itemLabel, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          const showLabel = mobile || expanded;
          const tooltipId = `dashboard-nav-tooltip-${href.replace(/[^a-zA-Z0-9-]/g, "-")}`;
          const showTooltip = (target: HTMLAnchorElement) => {
            const rect = target.getBoundingClientRect();
            setTooltip({
              href,
              label: itemLabel,
              left: rect.right + 8,
              top: rect.top + rect.height / 2,
            });
          };

          return (
            <Link
              key={href}
              href={href}
              dir="ltr"
              aria-label={itemLabel}
              aria-describedby={!showLabel && tooltip?.href === href ? tooltipId : undefined}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              onMouseEnter={(event) => {
                if (!showLabel) showTooltip(event.currentTarget);
              }}
              onMouseLeave={() => setTooltip(null)}
              onFocus={(event) => {
                if (!showLabel) showTooltip(event.currentTarget);
              }}
              onBlur={() => setTooltip(null)}
              className={`group relative flex transition-all duration-150 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand ${
                showLabel
                  ? "h-11 min-h-10 w-full items-center justify-start gap-3 rounded-xl px-3.5 text-sm font-medium"
                  : "h-11 w-11 mx-auto items-center justify-center rounded-2xl p-0 shrink-0"
              } ${
                active
                  ? "bg-shell-brand-active font-semibold text-white shadow-shell-active"
                  : "text-slate-600 hover:bg-shell-hover hover:text-shell-brand-hover dark:text-slate-300"
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 ${active ? "text-white" : "text-slate-500 group-hover:text-shell-brand-hover dark:text-slate-400"}`}
                strokeWidth={1.8}
              />
              {showLabel ? (
                <span dir="auto" className="truncate text-left">
                  {itemLabel}
                </span>
              ) : (
                <span className="sr-only">{itemLabel}</span>
              )}
            </Link>
          );
        })}
      </nav>
      {tooltip &&
        !mobile &&
        !expanded &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            id={`dashboard-nav-tooltip-${tooltip.href.replace(/[^a-zA-Z0-9-]/g, "-")}`}
            role="tooltip"
            dir="auto"
            style={{ left: tooltip.left, top: tooltip.top }}
            className="pointer-events-none fixed z-[100] -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-2 text-xs font-medium text-white shadow-lg"
          >
            {tooltip.label}
          </span>,
          document.body,
        )}
    </>
  );
}

export function DashboardAppShell({
  children,
  brandHref,
  primaryItems,
  secondaryItems,
  bottomItems,
  primaryNavigationLabel,
  secondaryNavigationLabel,
  accountControl,
  mobileAccountControl,
}: DashboardAppShellProps) {
  const locale = useLocale();
  const t = useTranslations("DashboardShell");
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const wasDrawerOpenRef = useRef(false);

  useEffect(() => {
    if (drawerOpen) {
      drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else if (wasDrawerOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasDrawerOpenRef.current = drawerOpen;
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  const hasSecondaryItems = secondaryItems.length > 0;
  const mobileMenuOpenLabel = drawerOpen ? t("closeMenu") : t("openMenu");
  const accountControlMobile = mobileAccountControl ?? accountControl;
  const shellStyle = {
    "--dashboard-sidebar-width":
      expanded && hasSecondaryItems
        ? "var(--dashboard-sidebar-expanded-width)"
        : "var(--dashboard-sidebar-collapsed-width)",
    "--dashboard-content-offset":
      expanded && hasSecondaryItems
        ? "var(--dashboard-content-offset-expanded)"
        : "var(--dashboard-content-offset-collapsed)",
  } as CSSProperties;

  return (
    <div
      dir="ltr"
      style={shellStyle}
      className="min-h-dvh bg-shell-background text-shell-foreground"
    >
      <aside
        aria-label={secondaryNavigationLabel}
        dir="ltr"
        className="fixed left-4 top-4 bottom-4 z-40 hidden w-[var(--dashboard-sidebar-width)] min-h-0 flex-col overflow-hidden rounded-shell-outer border border-shell-border bg-shell-surface px-3 py-2 shadow-shell-floating backdrop-blur-xl transition-[width] duration-200 lg:flex"
      >
        <div
          dir="ltr"
          className={`mb-2 flex shrink-0 px-0 py-3 ${expanded && hasSecondaryItems ? "items-center justify-between gap-2" : "flex-col items-center justify-center gap-1"}`}
        >
          <Link
            href={brandHref}
            aria-label="IT-SUM"
            title="IT-SUM"
            className={`flex h-11 shrink-0 items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand ${expanded && hasSecondaryItems ? "w-auto min-w-11 gap-2.5" : "w-11 justify-center"}`}
          >
            <Image
              src={logo}
              alt="IT-SUM"
              priority
              className="h-10 w-10 shrink-0 object-contain"
              sizes="40px"
            />
            {expanded && hasSecondaryItems && (
              <span
                dir="ltr"
                className="whitespace-nowrap text-sm font-bold tracking-tight text-[#0F172A] dark:text-white"
              >
                IT-SUM
              </span>
            )}
          </Link>
          {hasSecondaryItems && (
            <button
              type="button"
              aria-label={t(expanded ? "collapseSidebar" : "expandSidebar")}
              aria-expanded={expanded}
              title={t(expanded ? "collapseSidebar" : "expandSidebar")}
              onClick={() => setExpanded((value) => !value)}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-shell-hover hover:text-shell-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand ${expanded ? "ml-auto" : "mx-auto"}`}
            >
              {expanded ? (
                <PanelLeftClose aria-hidden="true" className="h-4 w-4" />
              ) : (
                <PanelLeftOpen aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {hasSecondaryItems && (
          <div
            dir="ltr"
            className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <DashboardNavigation
              items={secondaryItems}
              label={secondaryNavigationLabel}
              pathname={pathname}
              expanded={expanded}
            />
          </div>
        )}

        {bottomItems && bottomItems.length > 0 && (
          <div
            dir="ltr"
            className="mt-auto shrink-0 border-t border-shell-border pt-2"
          >
            <DashboardNavigation
              items={bottomItems}
              label={secondaryNavigationLabel}
              pathname={pathname}
              expanded={expanded}
            />
          </div>
        )}
      </aside>

      <header
        dir="ltr"
        className="sticky top-0 z-40 grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-shell-border bg-shell-surface px-3 backdrop-blur-xl lg:hidden"
      >
        <Link
          href={brandHref}
          aria-label="IT-SUM"
          className="col-start-2 row-start-1 flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shell-brand"
        >
          <Image
            src={logo}
            alt="IT-SUM"
            priority
            className="h-9 w-9 shrink-0 object-contain"
            sizes="36px"
          />
          <span
            className="whitespace-nowrap text-sm font-bold tracking-tight text-shell-brand-strong"
            dir="ltr"
          >
            IT-SUM
          </span>
        </Link>
        <div
          dir="ltr"
          className="col-start-1 row-start-1 flex min-w-0 items-center gap-1"
        >
          <ThemeToggle variant="circular" />
          <LanguageToggle />
          {accountControlMobile}
          {hasSecondaryItems && (
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={mobileMenuOpenLabel}
              aria-controls="dashboard-mobile-drawer"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-xl text-shell-brand-strong transition-colors hover:bg-shell-hover focus-visible:outline-2 focus-visible:outline-shell-brand"
            >
              {drawerOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </header>

      {primaryItems.length > 0 && (
        <div
          dir={getLocaleDirection(locale)}
          className="sticky top-16 z-20 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        >
          <div className="mx-auto w-fit">
            <DashboardNavigation
              items={primaryItems}
              label={primaryNavigationLabel}
              pathname={pathname}
              variant="primary"
            />
          </div>
        </div>
      )}

      {hasSecondaryItems && (
        <>
          {drawerOpen && (
            <button
              type="button"
              aria-label={t("closeMenu")}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-30 border-0 bg-slate-950/25 p-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:hidden"
            />
          )}
          <aside
            id="dashboard-mobile-drawer"
            ref={drawerRef}
            aria-label={secondaryNavigationLabel}
            dir={getLocaleDirection(locale)}
            aria-hidden={!drawerOpen}
            inert={!drawerOpen}
            className={`fixed left-3 right-3 top-32 bottom-3 z-50 flex flex-col overflow-y-auto rounded-shell-outer border border-shell-border bg-shell-surface p-3 shadow-shell-floating transition-transform lg:hidden ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <DashboardNavigation
              items={secondaryItems}
              label={secondaryNavigationLabel}
              pathname={pathname}
              mobile
              onNavigate={() => setDrawerOpen(false)}
            />
            {bottomItems && bottomItems.length > 0 && (
              <div className="mt-auto border-t border-shell-border pt-2">
                <DashboardNavigation
                  items={bottomItems}
                  label={secondaryNavigationLabel}
                  pathname={pathname}
                  mobile
                  onNavigate={() => setDrawerOpen(false)}
                />
              </div>
            )}
          </aside>
        </>
      )}

      <main
        dir={getLocaleDirection(locale)}
        className="min-w-0 pt-2 transition-[padding-left] duration-200 lg:pr-4 lg:pt-4 lg:pl-[var(--dashboard-content-offset)]"
      >
        <header
          dir="ltr"
          className="hidden w-full grid-cols-[1fr_auto_1fr] items-center gap-4 lg:grid"
        >
          {/* Column 1: Left Spacer for symmetry */}
          <div className="min-w-0" aria-hidden="true" />

          {/* Column 2: Centered 4-Item Nav Pill */}
          {primaryItems.length > 0 ? (
            <div
              dir={getLocaleDirection(locale)}
              className="min-w-0 max-w-full justify-self-center overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <DashboardNavigation
                items={primaryItems}
                label={primaryNavigationLabel}
                pathname={pathname}
                variant="primary"
              />
            </div>
          ) : (
            <div />
          )}

          {/* Column 3: Physical-Right 3-Controls Pod */}
          <div
            dir="ltr"
            className="justify-self-end inline-flex shrink-0 items-center gap-1 rounded-shell-outer border border-shell-border bg-shell-surface p-1.5 shadow-shell-controls"
          >
            <ThemeToggle variant="circular" />
            <LanguageToggle />
            {accountControl}
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
