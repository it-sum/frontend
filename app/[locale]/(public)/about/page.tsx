import AboutHero from "@/src/components/layouts/about/AboutHero";
import MissionVision from "@/src/components/layouts/about/MissionVision";
import Team from "@/src/components/layouts/about/Team";
import OurStory from "@/src/components/layouts/about/OurStory";
import AboutCTA from "@/src/components/layouts/about/AboutCTA";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.about");
  return { title: t("title"), description: t("description") };
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <MissionVision />
      <Team />
      <OurStory />
      <AboutCTA />
    </main>
  );
}
