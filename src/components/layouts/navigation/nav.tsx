"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link, usePathname } from "@/src/i18n/navigation";
import {
  APP_ROUTES,
  getLocaleDirection,
  PUBLIC_BRAND_CLASSES,
} from "@/src/constants/variables";
import { NavLinksArray } from "@/src/constants";
import Logo from "@/src/assets/images/logo.webp";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";

export default function Nav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      dir={getLocaleDirection(locale)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 lg:px-5 ${
          scrolled
            ? "border-black/5 bg-white/95 shadow-[0_8px_30px_rgba(2,8,18,0.06)] backdrop-blur-xl dark:border-white/8 dark:bg-background/95 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "border-black/5 bg-white/40 backdrop-blur-md dark:border-white/6 dark:bg-white/2"
        }`}
      >
        <Link href={APP_ROUTES.HOME} className="flex items-center gap-2.5">
          <div className="relative">
            <Image
              src={Logo}
              alt="IT-SUM"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
              className="h-8 w-8"
              priority
            />
          </div>
          <span
            dir="ltr"
            className="flex items-baseline text-lg font-bold tracking-tight italic"
          >
            <span className="text-neutral-900 dark:text-white">IT</span>
            <span className={`${PUBLIC_BRAND_CLASSES.wordmark} transition-colors duration-300`}>
              -SUM
            </span>
          </span>
        </Link>
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {NavLinksArray.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? PUBLIC_BRAND_CLASSES.activeNavigation
                    : // Fixed Tailwind v4 classes here
                      "text-neutral-500 hover:bg-black/4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/6 dark:hover:text-white"
                }`}
              >
                {t(item.label.toLowerCase())}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="h-5 w-px bg-black/10 dark:bg-white/10" />

          <Link
            href={APP_ROUTES.LOGIN}
            className={`rounded-lg ${PUBLIC_BRAND_CLASSES.primaryGradient} px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 ${PUBLIC_BRAND_CLASSES.primaryGradientHover}`}
            style={{ boxShadow: "0 6px 16px -4px rgba(6, 182, 212, 0.4)" }}
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
