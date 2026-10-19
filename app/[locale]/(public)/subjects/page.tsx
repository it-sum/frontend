import { BookOpen, Building2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.subjects");
  return { title: t("title"), description: t("description") };
}

export default async function SubjectsPage() {
  const t = await getTranslations("SubjectsPage");

  return (
    <main className="min-h-[70dvh] px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/70 p-6 text-center shadow-sm dark:border-white/8 dark:bg-[#071421] sm:p-10">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
          <BookOpen aria-hidden="true" className="size-6" />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">
          {t("status")}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          {t("description")}
        </p>
        <Link
          href="/departments"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          <Building2 aria-hidden="true" className="size-4" />
          {t("departments")}
        </Link>
      </section>
    </main>
  );
}
