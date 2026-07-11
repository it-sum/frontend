"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link, usePathname } from "@/src/i18n/navigation";
import { NavLinksArray } from "@/src/constants";
import Logo from "@/src/assets/images/Logo.png";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "dark:bg-[#0B1120]/80 bg-white/80 backdrop-blur-xl dark:border-white/5 border-black/5 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={Logo}
              alt="IT-SUM"
              width={36}
              height={36}
              style={{ width: "auto", height: "auto" }}
              className="h-9 w-9"
              priority
            />
            <h1 className="text-xl font-bold tracking-tight flex items-baseline">
              <span className="dark:text-white text-neutral-900">IT</span>
              <span className="dark:text-[#06B6D4] text-[#0284C7] transition-colors duration-300">
                -SUM
              </span>
            </h1>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NavLinksArray.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm transition-colors duration-200 group ${
                  pathname === item.href
                    ? "text-[#06B6D4]"
                    : "dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900"
                }`}
              >
                {t(item.label.toLowerCase())}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#06B6D4] group-hover:w-5 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 text-sm dark:text-neutral-300 text-neutral-600 dark:hover:text-white hover:text-neutral-900 transition-colors duration-200 rounded-lg dark:hover:bg-white/5 hover:bg-black/5"
            >
              {t("login")}
            </Link>
            <Link
              href="/get-started"
              className="relative px-5 py-2.5 text-sm font-medium text-white bg-linear-to-r from-[#06B6D4] to-[#0284C7] rounded-lg overflow-hidden group hover:from-[#0891B2] hover:to-[#0369A1] transition-all duration-200"
              style={{ boxShadow: "0 8px 20px -4px rgba(6, 182, 212, 0.3)" }}
            >
              <span className="relative z-10">{t("getStarted")}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}