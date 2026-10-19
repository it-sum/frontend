import Image from "next/image";
import { ArrowLeft, ArrowRight, Boxes, Play } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";

import bgLight from "@/src/assets/images/light.webp";
import bgDark from "@/src/assets/images/dark.webp";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // فصل آخر كلمتين من العنوان لتلوينهما
  const titleText = t("title");
  const titleWords = titleText.split(" ");
  const lastTwoWords = titleWords.slice(-2).join(" ");
  const restOfTitle = titleWords.slice(0, -2).join(" ");

  return (
    <main className="pt-16">
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden bg-white dark:bg-[#020812]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
        >
          <Image
            src={bgLight}
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover object-right transition-opacity duration-700 dark:opacity-0"
          />
          <Image
            src={bgDark}
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover object-right opacity-0 transition-opacity duration-700 dark:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/75 to-white/5 dark:from-[#020812] dark:via-[#020812]/65 dark:to-[#020812]/5" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(6,182,212,.08),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_15%_85%,rgba(6,182,212,.09),transparent_45%)]"
        />

        <div
          dir="ltr"
          className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-360 items-center px-5 py-14 sm:px-8 lg:px-12 xl:px-16"
        >
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="relative z-10 w-full text-start lg:max-w-[48%]"
          >
            {/* الشارة (Badge) */}
            <div className="mb-5 inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-500/20 bg-white/55 px-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md sm:mb-7 dark:border-cyan-400/20 dark:bg-[#07131f]/65 dark:shadow-[0_6px_24px_rgba(0,0,0,0.22)]">
              <Boxes
                aria-hidden="true"
                className="size-4 shrink-0 text-cyan-500"
              />
              <span className="bg-linear-to-r from-sky-500 via-cyan-500 to-green-500 bg-clip-text text-[11px] font-bold tracking-wide text-transparent sm:text-xs">
                {t("badge")}
              </span>
            </div>

            {/* العنوان الرئيسي مع تلوين آخر كلمتين */}
            <h1 className="max-w-127.5 text-[36px] font-bold leading-[1.12] tracking-[-0.035em] text-[#101923] sm:text-5xl lg:text-[56px] dark:text-white">
              {restOfTitle}{" "}
              <span className="bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {lastTwoWords}
              </span>
            </h1>

            {/* الوصف */}
            <p className="mt-4 max-w-117.5 text-sm leading-6 text-slate-700 sm:mt-6 sm:text-base sm:leading-7 dark:text-slate-300">
              {t("subtitle")}
            </p>

            {/* الأزرار - تم جعلها متساوية الحجم ومتجاوبة */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/resources"
                className="group flex h-12 w-full items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#079bf5] via-[#08bddd] to-[#32d575] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,174,214,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(8,174,214,0.3)] sm:flex-1"
              >
                {t("ctaPrimary")}
                {/* استخدام الشرط البرمجي لتحديد اتجاه السهم بدلاً من rtl: */}
                {isArabic ? (
                  <ArrowLeft
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                ) : (
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </Link>

              <a
                href="#features"
                className="group flex h-12 w-full items-center justify-center gap-4 rounded-lg border border-slate-200 bg-white/60 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/4 dark:text-white dark:hover:bg-white/8 sm:flex-1"
              >
                {t("ctaSecondary")}
                <Play
                  aria-hidden="true"
                  className="size-3.5 fill-transparent transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </div>

            {/* Supporting copy */}
            <div className="mt-6 sm:mt-10">
              <p className="max-w-55 text-xs leading-[1.65] text-slate-600 dark:text-slate-300">
                {t("trustText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
