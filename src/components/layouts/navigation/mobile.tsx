"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { X } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import { NavLinksArray } from "@/src/constants";
import Logo from "@/src/assets/images/logo.webp";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, x: -16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.04,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Mobile() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = menuPanelRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300 lg:hidden ${
          scrolled
            ? "border-black/5 bg-white/95 shadow-sm dark:border-white/8 dark:bg-[#0B1120]/95"
            : "border-black/5 bg-white/85 dark:border-white/6 dark:bg-[#0B1120]/85"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
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
              <span
                dir="ltr"
                className="flex items-baseline text-xl font-bold tracking-tight"
              >
                <span className="dark:text-white text-neutral-900">IT</span>
                <span className="dark:text-[#06B6D4] text-[#0284C7] transition-colors duration-300">
                  -SUM
                </span>
              </span>
            </Link>

            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label={t("openMenu")}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="site-mobile-menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="block h-[1.5px] w-full dark:bg-white bg-neutral-800 rounded-full" />
                <span className="block h-[1.5px] w-full dark:bg-white bg-neutral-800 rounded-full" />
                <span className="block h-[1.5px] w-[60%] dark:bg-white bg-neutral-800 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 dark:bg-black/60 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />

            <motion.div
              dir={isArabic ? "rtl" : "ltr"}
              id="site-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t("menuLabel")}
              onKeyDown={handleMenuKeyDown}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              ref={menuPanelRef}
              className="fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto overscroll-contain border-b border-black/5 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/5 dark:bg-[#0B1120]/95 lg:hidden"
            >
              {/* Header inside popup: Logo + Close button */}
              <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <Image
                      src={Logo}
                      alt="IT-SUM"
                      width={36}
                      height={36}
                      style={{ width: "auto", height: "auto" }}
                      className="h-9 w-9"
                    />
                    <span
                      dir="ltr"
                      className="flex items-baseline text-xl font-bold tracking-tight"
                    >
                      <span className="dark:text-white text-neutral-900">
                        IT
                      </span>
                      <span className="dark:text-[#06B6D4] text-[#0284C7] transition-colors duration-300">
                        -SUM
                      </span>
                    </span>
                  </Link>

                  <button
                    ref={closeButtonRef}
                    onClick={closeMenu}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                    aria-label={t("closeMenu")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px dark:bg-white/5 bg-black/5" />

              {/* Menu content */}
              <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="flex flex-col gap-1">
                  {NavLinksArray.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-4 py-3 text-base font-medium dark:text-neutral-300 text-neutral-700 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 rounded-xl transition-all duration-200"
                      >
                        {t(item.label.toLowerCase())}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="my-5 h-px dark:bg-white/5 bg-black/5"
                />

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.38,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-2 gap-3 mb-5"
                >
                  <div className="h-12 rounded-xl dark:border-white/10 border-black/10 border flex items-center justify-center dark:bg-white/5 bg-black/5">
                    <LanguageToggle />
                  </div>
                  <div className="h-12 rounded-xl dark:border-white/10 border-black/10 border flex items-center justify-center dark:bg-white/5 bg-black/5">
                    <ThemeToggle />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                  className="flex flex-col gap-3"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white bg-linear-to-r from-[#06B6D4] to-[#0284C7] rounded-xl hover:from-[#0891B2] hover:to-[#0369A1] transition-all duration-200"
                    style={{
                      boxShadow: "0 8px 20px -4px rgba(6, 182, 212, 0.3)",
                    }}
                  >
                    {t("login")}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
