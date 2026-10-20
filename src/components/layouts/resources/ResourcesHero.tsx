import { Info } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ResourcesFileVisual from "@/src/components/layouts/resources/ResourcesFileVisual";

const ResourcesHero = async () => {
  const t = await getTranslations("resources.hero");

  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div className="relative z-10 text-center lg:text-start">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/8 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-400/20 dark:text-amber-300">
            <Info aria-hidden="true" className="size-4" />
            {t("status")}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px] dark:text-white">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative flex min-h-56 items-center justify-center sm:min-h-72 lg:min-h-80"
        >
          <div className="absolute size-3/4 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.10)_0%,rgba(6,182,212,0)_70%)] dark:bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,rgba(6,182,212,0)_70%)]" />
          <ResourcesFileVisual />
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
