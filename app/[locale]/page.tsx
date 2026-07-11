import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="min-h-screen pt-16">
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] dark:bg-linear-to-b dark:from-white dark:to-neutral-400 bg-linear-to-b from-neutral-900 to-neutral-500 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="mt-6 dark:text-neutral-400 text-neutral-500 text-base md:text-lg max-w-xl mx-auto px-6">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <section
          key={i}
          className="h-screen flex items-center justify-center dark:border-white/5 border-black/5 border-t"
        >
          <p className="dark:text-neutral-600 text-neutral-400 text-sm">
            {t("section")} {i + 1}
          </p>
        </section>
      ))}
    </main>
  );
}
