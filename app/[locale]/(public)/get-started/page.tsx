import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/src/constants/variables";

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}${APP_ROUTES.LOGIN}`);
}
