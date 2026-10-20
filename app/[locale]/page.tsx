import Home from "@/src/components/layouts/Home";
import Contact from "@/src/components/layouts/sections/Contact";
import Features from "@/src/components/layouts/sections/Features";
import Footer from "@/src/components/layouts/sections/Footer";
import Preview from "@/src/components/layouts/sections/Preview";
import Recent from "@/src/components/layouts/sections/Recent";
import Responsive from "@/src/components/layouts/navigation/responsive";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.home");
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Responsive />
      <Home />
      <div className="bg-white text-slate-950 dark:bg-public-background dark:text-white">
        <Features />
        <Recent />
        <Preview />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
