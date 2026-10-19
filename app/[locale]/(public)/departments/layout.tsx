import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata.departments");
  return { title: t("title"), description: t("description") };
}

export default function DepartmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
