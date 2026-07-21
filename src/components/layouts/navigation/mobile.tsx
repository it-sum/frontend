"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { X } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import { NavLinksArray } from "@/src/constants";
import Logo from "@/src/assets/images/Logo.png";
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${
          scrolled
            ? "dark:bg-[#0B1120]/80 bg-white/80 backdrop-blur-xl dark:border-white/5 border-black/5 border-b"
            : "bg-transparent"
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
              <h1 className="text-xl font-bold tracking-tight flex items-baseline">
                <span className="dark:text-white text-neutral-900">IT</span>
                <span className="dark:text-[#06B6D4] text-[#0284C7] transition-colors duration-300">
                  -SUM
                </span>
              </h1>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-lg dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
              aria-label="Open menu"
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
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              dir="ltr"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 right-0 z-50 dark:bg-[#0B1120]/95 bg-white/95 backdrop-blur-2xl dark:border-white/5 border-black/5 border-b lg:hidden shadow-2xl"
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
                    <h1 className="text-xl font-bold tracking-tight flex items-baseline">
                      <span className="dark:text-white text-neutral-900">
                        IT
                      </span>
                      <span className="dark:text-[#06B6D4] text-[#0284C7] transition-colors duration-300">
                        -SUM
                      </span>
                    </h1>
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl dark:hover:bg-white/10 hover:bg-black/5 dark:text-white text-neutral-700 transition-colors"
                    aria-label="Close menu"
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
                    className="flex items-center justify-center px-4 py-3.5 text-sm font-medium dark:text-neutral-200 text-neutral-700 dark:hover:text-white hover:text-neutral-900 dark:border-white/10 border-black/10 border rounded-xl dark:hover:bg-white/5 hover:bg-black/5 transition-colors duration-200"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/get-started"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center px-4 py-3.5 text-sm font-semibold text-white bg-linear-to-r from-[#06B6D4] to-[#0284C7] rounded-xl hover:from-[#0891B2] hover:to-[#0369A1] transition-all duration-200"
                    style={{
                      boxShadow: "0 8px 20px -4px rgba(6, 182, 212, 0.3)",
                    }}
                  >
                    {t("getStarted")}
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
