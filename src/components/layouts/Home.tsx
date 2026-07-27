import Image from "next/image";
import { ArrowLeft, ArrowRight, Boxes, Play } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import bgLight from "@/src/assets/images/light.webp";
import bgDark from "@/src/assets/images/dark.webp";

// استيراد صور الطلاب بشكل مباشر ليتمكن next/image من معالجتها
import student1 from "@/src/assets/images/students/student-1.webp";
import student2 from "@/src/assets/images/students/student-2.webp";
import student3 from "@/src/assets/images/students/student-3.webp";
import student4 from "@/src/assets/images/students/student-4.webp";

const avatars = [student1, student2, student3, student4];

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
    <main className="relative min-h-screen overflow-hidden pt-16">
      {/* خلفية الموقع */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgLight}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-opacity duration-700 dark:opacity-0"
        />
        <Image
          src={bgDark}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-0 transition-opacity duration-700 dark:opacity-100"
        />
      </div>

      {/* إجبار القسم على البقاء LTR ليحافظ على نفس تخطيط الـ EN والمحاذاة لليسار */}
      <section
        dir="ltr"
        className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-360 items-center px-6 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="relative z-10 w-full max-w-130 text-left">
          {/* الشارة (Badge) */}
          <div className="mb-7 inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-500/20 bg-white/55 px-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-cyan-400/20 dark:bg-[#07131f]/65 dark:shadow-[0_6px_24px_rgba(0,0,0,0.22)]">
            <Boxes
              aria-hidden="true"
              className="size-4 shrink-0 text-cyan-500"
            />
            <span className="bg-linear-to-r from-sky-500 via-cyan-500 to-green-500 bg-clip-text text-[11px] font-bold tracking-wide text-transparent sm:text-xs">
              {t("badge")}
            </span>
          </div>

          {/* العنوان الرئيسي مع تلوين آخر كلمتين */}
          <h1 className="max-w-127.5 text-[42px] font-bold leading-[1.08] tracking-[-0.035em] text-[#101923] sm:text-5xl lg:text-[56px] dark:text-white">
            {restOfTitle}{" "}
            <span className="bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {lastTwoWords}
            </span>
          </h1>

          {/* الوصف */}
          <p className="mt-6 max-w-117.5 text-[15px] leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            {t("subtitle")}
          </p>

          {/* الأزرار - تم جعلها متساوية الحجم ومتجاوبة */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#start"
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
            </a>

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

          {/* الثقة (Avatars) - ستبقى دائماً على اليسار */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex shrink-0 -space-x-2.5">
              {avatars.map((src, index) => (
                <div
                  key={index}
                  className="relative size-9 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm dark:border-[#07111d] dark:bg-slate-800"
                  style={{
                    zIndex: avatars.length - index,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="max-w-55 text-xs leading-[1.65] text-slate-500 dark:text-slate-400">
              {t("trustText")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
