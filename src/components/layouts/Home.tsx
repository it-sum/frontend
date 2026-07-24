import Image from "next/image";
import { ArrowRight, Boxes, Play } from "lucide-react";
import { getTranslations } from "next-intl/server"; // تم إزالة getLocale

import bgLight from "@/src/assets/images/light.webp";
import bgDark from "@/src/assets/images/dark.webp";

const avatars = [
  "/images/students/student-1.webp",
  "/images/students/student-2.webp",
  "/images/students/student-3.webp",
  "/images/students/student-4.webp",
];

export default async function Home() {
  const t = await getTranslations("HomePage");
  // تم إزالة المتغيرات غير المستخدمة

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

      {/* محتوى الـ Hero */}
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-360 items-center px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* استخدام text-start بدلاً من الشروط، وستتماشى تلقائياً حسب dir الصفحة */}
        <div className="relative z-10 w-full max-w-130 text-start">
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

          {/* العنوان الرئيسي */}
          <h1 className="max-w-127.5 text-[42px] font-bold leading-[1.08] tracking-[-0.035em] text-[#101923] sm:text-5xl lg:text-[56px] dark:text-white">
            {t("title")}
          </h1>

          {/* الوصف */}
          <p className="mt-6 max-w-117.5 text-[15px] leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            {t("subtitle")}
          </p>

          {/* الأزرار */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#start"
              className="group inline-flex h-12 items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#079bf5] via-[#08bddd] to-[#32d575] px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,174,214,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(8,174,214,0.3)]"
            >
              {t("ctaPrimary")}
              {/* استخدام rtl: للتحكم في اتجاه السهم */}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </a>

            <a
              href="#features"
              className="group inline-flex h-12 items-center justify-center gap-4 rounded-lg border border-slate-200 bg-white/60 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/4 dark:text-white dark:hover:bg-white/8"
            >
              {t("ctaSecondary")}
              <Play
                aria-hidden="true"
                className="size-3.5 fill-transparent transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          </div>

          {/* الثقة (Avatars) */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex shrink-0 -space-x-2.5 rtl:space-x-reverse">
              {avatars.map((src, index) => (
                <div
                  key={src}
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
