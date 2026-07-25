import Home from "@/src/components/layouts/Home";
import Contact from "@/src/components/layouts/sections/Contact";
import Features from "@/src/components/layouts/sections/Features";
import Footer from "@/src/components/layouts/sections/Footer";
import Preview from "@/src/components/layouts/sections/Preview";
import Recent from "@/src/components/layouts/sections/Recent";
import Stats from "@/src/components/layouts/sections/Stats";
import Works from "@/src/components/layouts/sections/Works";
import Responsive from "@/src/components/layouts/navigation/responsive";
import { setRequestLocale } from "next-intl/server";

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
      <div className="bg-white text-slate-950 dark:bg-[#020812] dark:text-white">
        <Features />
        <Stats />
        <Works />
        <Recent />
        <Preview />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
