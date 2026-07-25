import AboutHero from "@/src/components/layouts/about/AboutHero";
import MissionVision from "@/src/components/layouts/about/MissionVision";
import Team from "@/src/components/layouts/about/Team";
import OurStory from "@/src/components/layouts/about/OurStory";
import AboutCTA from "@/src/components/layouts/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Team />
      <OurStory />
      <AboutCTA />
    </>
  );
}
