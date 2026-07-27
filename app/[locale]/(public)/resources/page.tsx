import ResourcesHero from "@/src/components/layouts/resources/ResourcesHero";
import ResourcesTypes from "@/src/components/layouts/resources/ResourcesTypes";
import ResourcesFind from "@/src/components/layouts/resources/ResourcesFind";
import ResourcesHowItWorks from "@/src/components/layouts/resources/ResourcesHowItWorks";

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <ResourcesTypes />
      <ResourcesFind />
      <ResourcesHowItWorks />
    </main>
  );
}
