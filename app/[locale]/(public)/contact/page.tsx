import Contact from "@/src/components/layouts/sections/Contact";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.contact");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden pt-16">
      <Contact headingLevel="h1" />
    </main>
  );
}
